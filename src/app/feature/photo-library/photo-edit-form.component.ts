import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSelect, MatOption } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map, tap, withLatestFrom, first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { UploadStatuses } from '../../../jam/model-library';
import { Photo, Tag } from '../../shared/model';
import { PhotoLibraryModuleState, PhotoLibraryAction } from './photo-library.store';
import { uniqueList, intersectUniqueLists, minusList, matDisplayFn } from '../../../jam/function-library';

@Component( {
	selector: 'app-photo-edit-form',
	templateUrl: './photo-edit-form.component.html',
	styleUrls: [ './photo-edit-form.component.css' ]
} )
export class PhotoEditFormComponent
{

	@ViewChild( 'tagSelect' ) public tagSelect: MatSelect;
	public form: FormGroup;
	public formItem: Photo;
	public selectedPhotos: Photo[];
	public multipleSelection: boolean;
	public tagList: Tag[];
	public filteredTagList: Tag[];
	public selectedTags: Tag[];
	public addedTags: Tag[];
	public removedTags: Tag[];
	public dummyTag: Tag;
	public tagDisplayFn: ( item: Tag ) => Tag[ keyof Tag ];

	constructor ( private store: Store<PhotoLibraryModuleState>, private formBuilder: FormBuilder )
	{
		/**
		 * Init
		 */
		this.formItem = {
			caption: null,
			description: null,
			tags: [],
			live: null
		};
		this.form = this.formBuilder.group( {
			caption: [ this.formItem.caption ],
			description: [ this.formItem.description ]
		} );
		this.addedTags = [];
		this.removedTags = [];
		this.dummyTag = { name: 'dummy' };
		this.tagDisplayFn = matDisplayFn<Tag>( 'name' );

		/**
		 * Store Selects
		 */
		this.store.pipe(
			select( state => state.photoLibraryState.selectedPhotos ),
			first(),
			withLatestFrom( this.store.pipe( select( state => state.photoLibraryState.tagList ) ) )
		)
			.subscribe( ( [ selectedPhotos, tagList ] ) =>
			{
				this.selectedPhotos = selectedPhotos;
				this.multipleSelection = selectedPhotos.length > 1;
				this.selectedTags = intersectUniqueLists( selectedPhotos.map( item => item.tags ), 'key' );
				this.tagList = tagList;
				this.filteredTagList = minusList( tagList, this.selectedTags, 'key' );

				if ( this.multipleSelection ) {
					this.form.get( 'caption' ).disable();
					this.form.get( 'description' ).disable();
					this.formItem.live = selectedPhotos.reduce( ( result, item ) => result && item.live, true );
				} else {
					this.formItem = JSON.parse( JSON.stringify( this.selectedPhotos[ 0 ] ) );
					this.form.get( 'caption' ).setValue( this.formItem.caption );
					this.form.get( 'description' ).setValue( this.formItem.description );
				}
			} );

	}

	public submit (): void
	{
		let photos: Photo[];
		if ( this.multipleSelection ) {
			photos = this.selectedPhotos.map( photo =>
			{
				let selectedTags = photo.tags
					.concat( this.addedTags )
					.filter( tag => !this.removedTags.find( rTag => rTag.key == tag.key ) );
				selectedTags = uniqueList( selectedTags, 'key' );
				return {
					key: photo.key,
					tags: selectedTags,
					tagKeys: selectedTags.map( tag => tag.key ),
					live: this.formItem.live
				}
			} );
		} else {
			photos = [ {
				key: this.selectedPhotos[ 0 ].key,
				caption: this.form.get( 'caption' ).value,
				description: this.form.get( 'description' ).value,
				tags: this.selectedTags,
				tagKeys: this.selectedTags.map( tag => tag.key ),
				live: this.formItem.live
			} ];
		}
		this.store.dispatch( new PhotoLibraryAction.Modify( photos ) );
	}

	public cancel (): void
	{
		this.store.dispatch( new PhotoLibraryAction.CancelEdit() );
	}

	public addTag ( tag: Tag ): void
	{
		this.addedTags = this.addedTags.concat( tag );
		this.selectedTags = this.selectedTags.concat( tag );
		this.filteredTagList = this.filteredTagList.filter( item => item.key != tag.key );
		this.tagSelect.value = this.dummyTag;
	}

	public removeTag ( tag: Tag ): void
	{
		this.removedTags = this.removedTags.concat( tag );
		this.selectedTags = this.selectedTags.filter( item => item.key != tag.key );
		this.filteredTagList = this.filteredTagList.concat( tag );
		this.tagSelect.value = this.dummyTag;
	}

}

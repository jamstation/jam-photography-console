import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, first, withLatestFrom } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Tag } from '../../shared/model';
import { TagModuleState, TagAction } from './tag.store';

@Component( {
	selector: 'app-tag-form',
	templateUrl: './tag-form.component.html',
	styleUrls: [ './tag-form.component.css' ]
} )
export class TagFormComponent
{

	public form: FormGroup;
	public formItem: Tag;
	public creating: boolean;

	constructor ( private store: Store<TagModuleState>, private formBuilder: FormBuilder )
	{

		/**
		 * Store Selects
		 */
		this.store.pipe(
			select( state => state.tagState.formItem ),
			first(),
			withLatestFrom( this.store.pipe( select( state => state.tagState.creating ) ) ) )
			.subscribe( ( [ formItem, creating ] ) =>
			{
				this.creating = creating;
				this.formItem = formItem;
				this.form = this.formBuilder.group( {
					name: [ this.formItem.name ],
				} );
			} )

	}

	public submit (): void
	{
		this.formItem = {
			...this.formItem,
			name: this.form.get( 'name' ).value
		};
		this.creating
			? this.store.dispatch( new TagAction.Add( this.formItem ) )
			: this.store.dispatch( new TagAction.Modify( this.formItem ) )
	}

	public cancel (): void
	{
		this.store.dispatch( new TagAction.CancelEdit() );
	}

}

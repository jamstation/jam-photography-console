import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, tap, switchMap, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { MatGridData, ScreenSizes } from '../../../jam/model-library';
import { Photo } from '../../shared/model';
import { PhotoLibraryModuleState, PhotoLibraryAction } from './photo-library.store';
import { PhotoLibraryService } from './photo-library.service';

@Component( {
	selector: 'app-photo-library',
	templateUrl: './photo-library.component.html',
	styleUrls: [ './photo-library.component.css' ]
} )
export class PhotoLibraryComponent implements OnInit
{

	public list: Observable<Photo[]>;
	public selectedPhotos: Observable<Photo[]>;
	public screenSize: Observable<ScreenSizes>;
	public gridLayoutData: Observable<MatGridData>;

	constructor ( private store: Store<PhotoLibraryModuleState>, private $: PhotoLibraryService )
	{

		/**
		 * Store Selects
		 */
		this.list = this.store.pipe( select( state => state.photoLibraryState.list ) );
		this.selectedPhotos = this.store.pipe( select( state => state.photoLibraryState.selectedPhotos ) );

		/**
		 * Store Dispatches
		 */
		this.store.dispatch( new PhotoLibraryAction.Load() );
		// this.store.dispatch( new PhotoLibraryAction.LoadTagList() );
	}

	ngOnInit (): void
	{
		this.screenSize = this.store.pipe(
			select( state => state.layoutState.screenSize )
		);

		this.gridLayoutData = this.screenSize.pipe(
			map( screenSize => this.$.getGridData( screenSize ) )
		);
	}

	/**
	 * Dispatch AddPhotos action
	 * @param fileList files selected by user to upload
	 */
	public add ( fileList: FileList ): void
	{
		if ( fileList.length <= 0 ) return;
		this.store.dispatch( new PhotoLibraryAction.AddPhotos( fileList ) );
	}

	/**
	 * Dispatch PauseUpload action
	 * @param photo photo to be paused or resumed
	 */
	public pauseUpload ( photo: Photo ): void
	{
		this.store.dispatch( new PhotoLibraryAction.PauseUpload( photo ) );
	}

	public edit (): void
	{
		this.store.dispatch( new PhotoLibraryAction.Edit() );
	}

	public select ( photo: Photo ): void
	{
		if ( photo.uploadInfo$ ) return;
		photo.selected$ = !photo.selected$;
		this.store.dispatch( new PhotoLibraryAction.Select( photo ) );
	}

	/**
	 * Dispatch UnselectAll action
	 */
	public unselectAll (): void
	{
		this.store.dispatch( new PhotoLibraryAction.UnSelectAll() );
	}

	/**
	 * Dispatch Remove action
	 */
	public remove (): void
	{
		this.store.dispatch( new PhotoLibraryAction.Remove() );
	}

}

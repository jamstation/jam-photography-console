import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap, first, withLatestFrom, toArray, merge, skip, concatMap, mergeMap } from "rxjs/operators";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from "../../core";
import { PhotoLibraryActionTypes, PhotoLibraryAction } from "./photo-library.actions";
import { Metadata, KeyValue, UploadableFile, UploadStatuses } from "../../../jam/model-library";
import { Validators } from "@angular/forms";
import { Photo } from "../../shared/model";
import { JamFirestoreStorage } from "../../../jam/firestore-storage";
import { PhotoLibraryModuleState } from "./photo-library.state";
import { PhotoLibraryService } from "./photo-library.service";
import { uniqueList, sortStringList, modifyFileNameInPath, mergeObservables, concatObservables } from "../../../jam/function-library";
import { PhotoFormComponent } from "./photo-form.component";

@Injectable()
export class PhotoLibraryEffects
{
	@Effect() public load: Observable<Action>;
	@Effect() public addPhotos: Observable<Action>;
	@Effect() public generateThumbnails: Observable<Action>;
	@Effect() public upload: Observable<Action>;
	@Effect() public uploadStarted: Observable<Action>;
	@Effect( { dispatch: false } ) public pauseUpload: Observable<any>;
	@Effect() public add: Observable<Action>;
	@Effect( { dispatch: false } ) public openDialog: Observable<any>;
	@Effect( { dispatch: false } ) public closeDialog: Observable<any>;
	@Effect() public modify: Observable<Action>;
	@Effect() public remove: Observable<Action>;

	constructor (
		private actions: Actions,
		private db: DatabaseService,
		private store: Store<PhotoLibraryModuleState>,
		private jamFirestoreStorage: JamFirestoreStorage,
		private $: PhotoLibraryService,
		private dialogManager: MatDialog
	)
	{

		this.load = this.actions.pipe(
			ofType<PhotoLibraryAction.Load>( PhotoLibraryActionTypes.load ),
			switchMap( action => this.db.tables.Photo.list ),
			switchMap( list => this.db.tables.Tag.list
				, ( outerValue, innerValue ) => ( { list: outerValue, tagList: innerValue } ) ),
			map( ( { list, tagList } ) =>
			{
				list = list.map( item => ( {
					...item,
					tags: item.tagKeys.map( key => tagList.find( rItem => rItem.key === key ) )
				} ) );
				return { list, tagList };
			} ),
			withLatestFrom( this.store.pipe( select( state => state.photoLibraryState.localThumbnails ) ) ),
			map( ( [ { list, tagList }, localThumbnails ] ) =>
			{
				list = list.map( item => item.thumbnail
					? item
					: ( { ...item, thumbnail: ( localThumbnails.find( tItem => tItem.key === item.cloudPath ) || { key: null, value: null } ).value } )
				)
				return { list, tagList };
			} ),
			switchMap( ( { list, tagList } ) => this.store.pipe(
				select( state => state.photoLibraryState.uploadingPhotos )
			), ( outerValue, innerValue ) => ( { ...outerValue, uploadingPhotos: innerValue } ) ),
			map( ( { list, tagList, uploadingPhotos } ) =>
			{
				list = uploadingPhotos.concat( list );
				list = uniqueList( list, 'cloudPath' );
				list = sortStringList( list, 'cloudPath', true );
				return { list, tagList };
			} )
		).pipe(
			withLatestFrom( this.store.pipe( select( state => state.photoLibraryState.selectedPhotos ) ) ),
			map( ( [ { list, tagList }, selectedList ] ) => ( {
				list, tagList, selectedList: selectedList.map( sItem =>
				{
					const foundItem = list.find( item => item.key == sItem.key ) || sItem;
					/* Same object needs to be returned to preserve upload info */
					foundItem.selected$ = !!foundItem;
					return foundItem;
				} )
			} ) ),
			map( ( { list, tagList, selectedList } ) => new PhotoLibraryAction.Loaded( list, tagList, selectedList ) )
		);

		// this.loadTagList = this.actions.pipe(
		// 	ofType<PhotoLibraryAction.LoadTagList>( PhotoLibraryActionTypes.loadTagList ),
		// 	switchMap( action => this.db.tables.Tag.list ),
		// 	map( tagList => new PhotoLibraryAction.TagListLoaded( tagList ) )
		// );

		this.add = this.actions.pipe(
			ofType<PhotoLibraryAction.Add>( PhotoLibraryActionTypes.add ),
			mergeMap( action => this.db.tables.Photo.updateElseInsert( action.item, 'cloudPath' ) ),
			map( item => item
				? new PhotoLibraryAction.Added( item )
				: new PhotoLibraryAction.AddFailed() )
		);

		this.addPhotos = this.actions.pipe(
			ofType<PhotoLibraryAction.AddPhotos>( PhotoLibraryActionTypes.addPhotos ),
			map( action => this.$.mapFilesToPhotos( action.fileList ) ),
			map( photos => new PhotoLibraryAction.GenerateThumbnails( photos ) )
		);

		this.generateThumbnails = this.actions.pipe(
			ofType<PhotoLibraryAction.GenerateThumbnails>( PhotoLibraryActionTypes.generateThumbnails ),
			mergeMap( action => this.$.addThumbnailsToPhotos( action.uploadingPhotos ) ),
			map( photos => new PhotoLibraryAction.Upload( photos ) )
		);

		this.upload = this.actions.pipe(
			ofType<PhotoLibraryAction.Upload>( PhotoLibraryActionTypes.upload ),
			map( action => this.$.upload( action.uploadingPhotos ) ),
			map( photos => new PhotoLibraryAction.UploadStarted( photos ) )
		);

		this.uploadStarted = this.actions.pipe(
			ofType<PhotoLibraryAction.UploadStarted>( PhotoLibraryActionTypes.uploadStarted ),
			map( action => ( { photos: action.uploadingPhotos, uploadTasks: action.uploadingPhotos.map( photo => photo.uploadInfo$.task ) } ) ),
			mergeMap( ( { photos, uploadTasks } ) => this.jamFirestoreStorage.notifyOnCompletion( uploadTasks )
				, ( outerValue, innerValue ) => outerValue.photos[ innerValue ] ),
			map( photo => ( { ...photo, thumbnail: null, fileSize: photo.uploadInfo$.task.task.snapshot.bytesTransferred } ) ),
			map( photo => new PhotoLibraryAction.Add( photo ) )
		);

		this.pauseUpload = this.actions.pipe(
			ofType<PhotoLibraryAction.PauseUpload>( PhotoLibraryActionTypes.pauseUpload ),
			map( action =>
			{
				action.item.uploadInfo$.task.task.snapshot.state === 'paused'
					? action.item.uploadInfo$.task.resume()
					: action.item.uploadInfo$.task.pause();
			} )
		);

		this.modify = this.actions.pipe(
			ofType<PhotoLibraryAction.Modify>( PhotoLibraryActionTypes.modify ),
			switchMap( action => this.db.tables.Photo.updateFieldsMany( action.list ) ),
			map( updatedItems => updatedItems.length
				? new PhotoLibraryAction.Modified( updatedItems )
				: new PhotoLibraryAction.ModifyFailed() )
		);

		this.remove = this.actions.pipe(
			ofType<PhotoLibraryAction.Remove>( PhotoLibraryActionTypes.remove ),
			withLatestFrom( this.store.pipe( select( state => state.photoLibraryState.selectedPhotos ) ) ),
			map( ( [ action, selectedPhotos ] ) => selectedPhotos
				.map( item => this.db.tables.Photo.remove( item.key ) ) ),
			concatMap( items => concatObservables( items ) ),
			map( item => item
				? new PhotoLibraryAction.Removed( item )
				: new PhotoLibraryAction.RemoveFailed() )
		);

		this.openDialog = this.actions.pipe(
			ofType<PhotoLibraryAction.Edit>( PhotoLibraryActionTypes.edit ),
			map( action => this.dialogManager.open( PhotoFormComponent, { width: '800px', id: 'PhotoFormComponent' } ) )
		);

		this.closeDialog = this.actions.pipe(
			ofType( PhotoLibraryActionTypes.cancelEdit, PhotoLibraryActionTypes.modified ),
			map( action => this.dialogManager.getDialogById( 'PhotoFormComponent' ).close() )
		);

	}
}

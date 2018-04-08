import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap, first, withLatestFrom, toArray, merge, skip, concatMap, mergeMap } from "rxjs/operators";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from "../../core";
import { PhotoLibraryActionTypes, PhotoLibraryAction } from "./photo-library.actions";
import { Metadata, KeyValue, UploadableFile, UploadStatuses } from "../../../jam/model-library";
import { Validators } from "@angular/forms";
import { PHOTO_UPLOAD_FOLDER } from "./photo-library.config";
import { Photo } from "../../shared/model";
import { JamFirestoreStorage } from "../../../jam/firestore-storage";
import { PhotoLibraryModuleState } from "./photo-library.state";
import { PhotoLibraryService } from "./photo-library.service";
import { AngularFireStorage } from "angularfire2/storage";
import { uniqueList, sortStringList, modifyFileNameInPath, mergeObservables, concatObservables } from "../../../jam/function-library";

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
	// @Effect() public modify: Observable<Action>;
	@Effect() public remove: Observable<Action>;

	constructor (
		private actions: Actions,
		private db: DatabaseService,
		private store: Store<PhotoLibraryModuleState>,
		private jamFirestoreStorage: JamFirestoreStorage,
		private $: PhotoLibraryService
	)
	{

		this.load = this.actions.pipe(
			ofType<PhotoLibraryAction.Load>( PhotoLibraryActionTypes.load ),
			switchMap( action => this.db.tables.Photo.list ),
			switchMap( list => this.store.pipe(
				select( state => state.photoLibraryState.uploadingPhotos )
			), ( outerValue, innerValue ) => ( [ outerValue, innerValue ] ) ),
			map( ( [ list, uploadingPhotos ] ) => uploadingPhotos.concat( list ) ),
			map( list => uniqueList( list, 'cloudPath' ) ),
			map( list => sortStringList( list, 'cloudPath', true ) ),
			withLatestFrom( this.store.pipe( select( state => state.photoLibraryState.selectedPhotos ) ) ),
			map( ( [ list, selectedList ] ) => list.map( item =>
			{
				/* Same object needs to be returned to preserve upload info */
				item.tags = [ 'architecture', 'city', 'black & white', 'nature', 'people', 'portrait', 'faces' ];
				item.selected$ = !!selectedList.find( selectedItem => selectedItem.cloudPath == item.cloudPath );
				return item;
			} ) ),
			map( list => new PhotoLibraryAction.Loaded( list ) )
		);

		this.add = this.actions.pipe(
			ofType<PhotoLibraryAction.Add>( PhotoLibraryActionTypes.add ),
			mergeMap( action => this.db.tables.Photo.updateElseInsert( action.item, 'cloudPath' ) ),
			map( item => item
				? new PhotoLibraryAction.Added( item )
				: new PhotoLibraryAction.AddFailed() )
		);

		this.remove = this.actions.pipe(
			ofType<PhotoLibraryAction.Remove>( PhotoLibraryActionTypes.remove ),
			withLatestFrom( this.store.pipe( select( state => state.photoLibraryState.selectedPhotos ) ) ),
			map( ( [ action, selectedPhotos ] ) => selectedPhotos
				.map( item => this.db.tables.Photo.remove( item.key ).pipe(
					concatMap( deletedItem => this.jamFirestoreStorage.ref( item.cloudPath ).delete() ),
					map( () => modifyFileNameInPath( item.cloudPath, ( fileName ) => 'thumb_' + fileName ) ),
					concatMap( thumbnailCloudPath => this.jamFirestoreStorage.ref( thumbnailCloudPath ).delete() ),
					map( () => item )
				) ) ),
			concatMap( items => concatObservables( items ) ),
			map( item => item
				? new PhotoLibraryAction.Removed( item )
				: new PhotoLibraryAction.RemoveFailed() )
		);

		this.addPhotos = this.actions.pipe(
			ofType<PhotoLibraryAction.AddPhotos>( PhotoLibraryActionTypes.addPhotos ),
			map( action => this.$.mapFilesToPhotos( action.fileList ) ),
			map( photos => new PhotoLibraryAction.GenerateThumbnails( photos ) )
		);

		this.generateThumbnails = this.actions.pipe(
			ofType<PhotoLibraryAction.GenerateThumbnails>( PhotoLibraryActionTypes.generateThumbnails ),
			mergeMap( action => this.$.addThumbnailsToPhotos( action.list ) ),
			map( photos => new PhotoLibraryAction.Upload( photos ) )
		);

		this.upload = this.actions.pipe(
			ofType<PhotoLibraryAction.Upload>( PhotoLibraryActionTypes.upload ),
			map( action => this.$.upload( action.list ) ),
			map( photos => new PhotoLibraryAction.UploadStarted( photos ) )
		);

		this.uploadStarted = this.actions.pipe(
			ofType<PhotoLibraryAction.UploadStarted>( PhotoLibraryActionTypes.uploadStarted ),
			map( action => ( { photos: action.list, uploadTasks: action.list.map( photo => photo.uploadInfo$.task ) } ) ),
			mergeMap( ( { photos, uploadTasks } ) => this.jamFirestoreStorage.notifyOnCompletion( uploadTasks )
				, ( outerValue, innerValue ) => outerValue.photos[ innerValue ] ),
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

	}
}

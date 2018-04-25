import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from '../../core';
import { ProfileModuleState } from "./profile.state";
import { ProfileActionTypes, ProfileAction } from "./profile.actions";
import { ProfileService } from "./profile.service";
import { ProfileFormComponent } from "./profile-form.component";

@Injectable()
export class ProfileEffects
{
	@Effect() public upload: Observable<Action>;
	@Effect() public uploadStarted: Observable<Action>;
	@Effect( { dispatch: false } ) public openDialog: Observable<any>;
	@Effect( { dispatch: false } ) public closeDialog: Observable<any>;
	@Effect() public modify: Observable<Action>;

	constructor (
		private actions: Actions,
		private store: Store<ProfileModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog,
		private $: ProfileService
	)
	{

		this.upload = this.actions.pipe(
			ofType<ProfileAction.Upload>( ProfileActionTypes.upload ),
			switchMap( action => this.$.resizePhoto( action.file ) ),
			map( photo => this.$.upload( photo ) ),
			map( photo => new ProfileAction.UploadStarted( photo ) )
		);

		this.uploadStarted = this.actions.pipe(
			ofType<ProfileAction.UploadStarted>( ProfileActionTypes.uploadStarted ),
			switchMap( action => action.photo.uploadInfo$.task.downloadURL() ),
			map( url => new ProfileAction.Modify( { photoURL: url } ) )
		);

		this.modify = this.actions.pipe(
			ofType<ProfileAction.Modify>( ProfileActionTypes.modify ),
			withLatestFrom( this.store.pipe( select( state => state.authState.user ) ) ),
			map( ( [ action, user ] ) => ( { ...action.user, key: user.key, uid: null, email: null } ) ),
			switchMap( user => this.db.tables.User.updateFields( user ) ),
			map( item => item
				? new ProfileAction.Modified( item )
				: new ProfileAction.ModifyFailed() )
		);

		this.openDialog = this.actions.pipe(
			ofType<ProfileAction.Edit>( ProfileActionTypes.edit ),
			map( action => this.dialogManager.open( ProfileFormComponent, { width: '400px', id: 'ProfileFormComponent' } ) )
		);

		this.closeDialog = this.actions.pipe(
			ofType( ProfileActionTypes.cancelEdit, ProfileActionTypes.modified ),
			map( action => this.dialogManager.getDialogById( 'ProfileFormComponent' ).close() )
		);

	}
}

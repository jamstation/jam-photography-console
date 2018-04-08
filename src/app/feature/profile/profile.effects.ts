import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from "../../core";
import { ProfileActionTypes, ProfileAction } from "./profile.actions";
import { MatDialog } from "@angular/material";
import { Metadata, KeyValue } from "../../../jam/model-library";
import { Validators } from "@angular/forms";
import { ProfileModuleState } from "./profile.state";

@Injectable()
export class ProfileEffects
{
	// @Effect() public edit$: Observable<Action>;
	// @Effect() public edited$: Observable<Action>;
	@Effect() public modify$: Observable<Action>;

	constructor (
		private actions$: Actions,
		private store: Store<ProfileModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		// this.edit$ = this.actions$.pipe(
		// 	ofType<ProfileAction.Edit>( ProfileActionTypes.edit ),
		// 	map( action => this.dialogManager.open( JamTextBoxDialogComponent, {
		// 		id: 'ProfileComponent-JamTextBoxDialogComponent',
		// 		minWidth: '500px',
		// 		data: {
		// 			label: action.item.label,
		// 			value: action.item.value,
		// 			validators: [ Validators.required ]
		// 		}
		// 	} ) ),
		// 	switchMap( dialogRef => dialogRef.afterClosed() ),
		// 	tap( result => console.log( result ) ),
		// 	map( ( result: KeyValue ) => result
		// 		? new ProfileAction.Edited( result )
		// 		: new ProfileAction.EditCancelled() ),
		// );

		// this.edited$ = this.actions$.pipe(
		// 	ofType<ProfileAction.Edited>( ProfileActionTypes.edited ),
		// 	withLatestFrom( this.store.pipe( select( state => state.profileState.list ) ) ),
		// 	map( ( [ action, list ] ) => list.find( item => item.name == action.result.key ) ),
		// 	map( item => new ProfileAction.Modify( item ) )
		// );

		this.modify$ = this.actions$.pipe(
			ofType<ProfileAction.Modify>( ProfileActionTypes.modify ),
			switchMap( action => this.db.tables.Layout.updateElseInsert( action.item ) ),
			map( item => item
				? new ProfileAction.Modified( item )
				: new ProfileAction.ModifyFailed() )
		);

	}
}

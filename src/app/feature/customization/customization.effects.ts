import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from "../../core";
import { CustomizationActionTypes, CustomizationAction } from "./customization.actions";
import { MatDialog } from "@angular/material";
import { Metadata, KeyValue } from "../../../jam/model-library";
import { Validators } from "@angular/forms";

@Injectable()
export class CustomizationEffects
{
	// @Effect() public edit$: Observable<Action>;

	constructor (
		private actions$: Actions,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		// this.edit$ = this.actions$.pipe(
		// 	ofType<CustomizationAction.Edit>( CustomizationActionTypes.edit ),
		// 	map( action => this.dialogManager.open( JamTextBoxDialogComponent, {
		// 		id: 'CustomizationComponent-JamTextBoxDialogComponent',
		// 		minWidth: '500px',
		// 		data: {
		// 			label: action.setting.name,
		// 			value: action.setting.value,
		// 			validators: [ Validators.required ]
		// 		}
		// 	} ) ),
		// 	switchMap( dialogRef => dialogRef.afterClosed() ),
		// 	tap( result => console.log( result ) ),
		// 	map( ( result: KeyValue ) => result
		// 		? new CustomizationAction.Edited( result )
		// 		: new CustomizationAction.EditCancelled() ),
		// );

	}
}

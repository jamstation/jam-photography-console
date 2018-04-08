import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from "../../core";
import { SettingsActionTypes, SettingsAction } from "./settings.actions";
import { MatDialog } from "@angular/material";
import { Metadata, KeyValue } from "../../../jam/model-library";
import { Validators } from "@angular/forms";

@Injectable()
export class SettingsEffects
{

	@Effect() public modify$: Observable<Action>;

	constructor (
		private actions$: Actions,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		this.modify$ = this.actions$.pipe(
			ofType<SettingsAction.Modify>( SettingsActionTypes.modify ),
			switchMap( action => this.db.tables.Layout.updateElseInsert( action.item ) ),
			map( item => item
				? new SettingsAction.Modified( item )
				: new SettingsAction.ModifyFailed() )
		);

	}
}

import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { map, switchMap } from "rxjs/operators";
import { DatabaseService } from "../../core";
import { SettingsActionTypes, SettingsAction } from "./settings.actions";

@Injectable()
export class SettingsEffects
{

	@Effect() public modify: Observable<Action>;

	constructor ( private actions: Actions, private db: DatabaseService )
	{

		this.modify = this.actions.pipe(
			ofType<SettingsAction.Modify>( SettingsActionTypes.modify ),
			switchMap( action => this.db.tables.Settings.updateElseInsert( action.item ) ),
			map( item => item
				? new SettingsAction.Modified( null )
				: new SettingsAction.ModifyFailed() )
		);

	}
}

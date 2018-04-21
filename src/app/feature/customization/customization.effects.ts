import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { map, switchMap } from "rxjs/operators";
import { DatabaseService } from "../../core";
import { CustomizationActionTypes, CustomizationAction } from "./customization.actions";

@Injectable()
export class CustomizationEffects
{

	@Effect() public modify: Observable<Action>;

	constructor ( private actions: Actions, private db: DatabaseService )
	{

		this.modify = this.actions.pipe(
			ofType<CustomizationAction.Modify>( CustomizationActionTypes.modify ),
			switchMap( action => this.db.tables.Customization.updateElseInsert( action.item ) ),
			map( item => item
				? new CustomizationAction.Modified( null )
				: new CustomizationAction.ModifyFailed() )
		);

	}
}

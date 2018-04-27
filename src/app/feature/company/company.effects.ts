import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { DatabaseAction } from "../../../jam/firestore";
import { CompanyModuleState } from "./company.state";
import { CompanyActionTypes, CompanyAction } from "./company.actions";

@Injectable()
export class CompanyEffects
{

	@Effect() public select: Observable<Action>;

	constructor (
		private actions: Actions,
		private store: Store<CompanyModuleState>
	)
	{
		this.select = this.actions.pipe(
			ofType<CompanyAction.Select>( CompanyActionTypes.select ),
			map( action => new DatabaseAction.EnterCollection( 'Company', action.key ) )
		);
	}
}

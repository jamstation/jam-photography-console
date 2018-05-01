import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { DatabaseAction } from "../../../jam/firestore";
import { CompanyModuleState } from "./company.state";
import { CompanyActionTypes, CompanyAction } from "./company.actions";
import { DatabaseService } from "../../core";

@Injectable()
export class CompanyEffects
{

	@Effect() public select: Observable<Action>;

	constructor (
		private actions: Actions,
		private db: DatabaseService
	)
	{
		this.select = this.actions.pipe(
			ofType<CompanyAction.Select>( CompanyActionTypes.select ),
			switchMap( action => this.db.tables.Company.get( action.key ) ),
			map( company => new CompanyAction.Selected( company ) )
		);
	}
}

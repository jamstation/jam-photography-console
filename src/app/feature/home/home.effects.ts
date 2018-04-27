import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap, withLatestFrom, filter, first } from "rxjs/operators";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { KeyValue } from "../../../jam/model-library";
import { DatabaseService } from '../../core';
import { HomeModuleState } from "./home.state";
import { HomeActionTypes, HomeAction } from "./home.actions";
import { DatabaseAction } from "../../../jam/firestore";

@Injectable()
export class HomeEffects
{
	@Effect() public load: Observable<Action>;

	constructor (
		private actions: Actions,
		private store: Store<HomeModuleState>,
		private db: DatabaseService
	)
	{
		this.load = this.actions.pipe(
			ofType<HomeAction.Load>( HomeActionTypes.load ),
			switchMap( action => this.db.tables.UserCompany.list ),
			map( list => new HomeAction.Loaded( list ) )
		);
	}
}

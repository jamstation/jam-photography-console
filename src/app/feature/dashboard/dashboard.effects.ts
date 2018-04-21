import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap } from "rxjs/operators";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { KeyValue } from "../../../jam/model-library";
import { DatabaseService } from '../../core';
import { DashboardModuleState } from "./dashboard.state";
import { DashboardActionTypes, DashboardAction } from "./dashboard.actions";
import { DashboardService } from "./dashboard.service";

@Injectable()
export class DashboardEffects
{
	@Effect() public load: Observable<Action>;

	constructor (
		private actions: Actions,
		private store: Store<DashboardModuleState>,
		private db: DatabaseService,
		private $: DashboardService
	)
	{
		this.load = this.actions.pipe(
			ofType<DashboardAction.Load>( DashboardActionTypes.load ),
			switchMap( action => this.db.tables.Aggregate.list ),
			map( list => new DashboardAction.Loaded( list ) )
		);
	}
}

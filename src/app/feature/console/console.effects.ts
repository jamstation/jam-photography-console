import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap, withLatestFrom } from "rxjs/operators";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { KeyValue } from "../../../jam/model-library";
import { DatabaseService } from '../../core';
import { ConsoleModuleState } from "./console.state";
import { ConsoleActionTypes, ConsoleAction } from "./console.actions";

@Injectable()
export class ConsoleEffects
{
	@Effect() public load: Observable<Action>;

	constructor (
		private actions: Actions,
		private store: Store<ConsoleModuleState>,
		private db: DatabaseService
	)
	{
		this.load = this.actions.pipe(
			ofType<ConsoleAction.Load>( ConsoleActionTypes.load ),
			withLatestFrom( this.store.pipe( select( state => state.authState.user ) ) ),
			switchMap( ( [ action, user ] ) => this.db.tables.Company.filter( 'userKey', '==', user.email ) ),
			map( list => new ConsoleAction.Loaded( list ) )
		);
	}
}

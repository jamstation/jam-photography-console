import { Injectable } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap, filter, first, mergeMap } from "rxjs/operators";
import { Action, select, Store } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from "./../../core/database.service";
import { LayoutActionTypes, LayoutAction } from "./layout.actions";
import { NavigatorAction, NavigatorActionTypes } from "../../../jam/navigator";
import { Pages } from "../../shared/model/pages.enum";
import { sqlJoin } from "../../../jam/function-library";
import { AppModuleState } from "../../app.store";
import { ScreenSizes, KeyValue } from "../../../jam/model-library";
import { AuthAction, AuthActionTypes } from "../../../jam/auth";
import { DatabaseAction, Table } from "../../../jam/firestore";

@Injectable()
export class LayoutEffects
{
	@Effect() public load: Observable<Action>;
	@Effect() public selectNavItem: Observable<Action>;

	constructor (
		private actions: Actions,
		private db: DatabaseService,
		private store: Store<AppModuleState>,
		private observableMedia: ObservableMedia
	)
	{

		this.load = this.actions.pipe(
			ofType<LayoutAction.Load>( LayoutActionTypes.load ),
			switchMap( action => this.store.pipe(
				select( state => state.databaseState.initialized ),
				filter( initialized => initialized ) )
				, ( outerValue, innerValue ) => outerValue ),
			switchMap( action => this.db.tables.GlobalLayout
				.query( ref => ref
					.where( 'category', '==', action.category )
					.where( 'active', '==', true ) )
				, ( outerValue, innerValue ) => ( { globalList: innerValue, category: outerValue.category } ) ),
			switchMap( ( { globalList, category } ) => this.db.tables[ category ].active
				? ( this.db.tables[ category ] as Table<KeyValue> ).list.pipe(
					map( list => ( { globalList, category, list } ) ),
					map( ( { globalList, category, list } ) => ( { list: sqlJoin( globalList, list, 'key' ), category: category } ) ) )
				: Observable.of( { list: globalList, category } ) ),
			map( ( { list, category } ) => new LayoutAction.Loaded( list, category ) )
		);

		this.selectNavItem = this.actions.pipe(
			ofType<LayoutAction.SelectNavItem>( LayoutActionTypes.selectNavItem ),
			map( action => new NavigatorAction.Navigate( action.navItem.link ) )
		);

	}
}

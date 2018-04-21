import { Injectable } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap, filter, first } from "rxjs/operators";
import { Action, select, Store } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from "./../../core/database.service";
import { LayoutActionTypes, LayoutAction } from "./layout.actions";
import { NavigatorAction, NavigatorActionTypes } from "../../../jam/navigator";
import { Pages } from "../../shared/model/pages.enum";
import { sqlJoin } from "../../../jam/function-library";
import { CoreModuleState } from "../../core/core.store";
import { ScreenSizes, KeyValue } from "../../../jam/model-library";
import { AuthAction, AuthActionTypes } from "../../../jam/auth";

@Injectable()
export class LayoutEffects
{
	@Effect() public initialize: Observable<Action>;
	@Effect() public setUser: Observable<Action>;
	@Effect() public load: Observable<Action>;
	@Effect() public selectNavItem: Observable<Action>;

	constructor (
		private actions: Actions,
		private db: DatabaseService,
		private store: Store<CoreModuleState>,
		private observableMedia: ObservableMedia
	)
	{

		this.initialize = this.actions.pipe(
			ofType<LayoutAction.Initialize>( LayoutActionTypes.initialize ),
			switchMap( action => this.observableMedia.asObservable() ),
			map( mediaChange => mediaChange.mqAlias as ScreenSizes ),
			map( screenSize => new LayoutAction.ScreenSizeChanged( screenSize ) )
		);

		this.setUser = this.actions.pipe(
			ofType<AuthAction.Authenticated>( AuthActionTypes.authenticated ),
			switchMap( action => this.store.pipe(
				map( state => state.databaseState.initialized ),
				filter( initialized => initialized ),
				first() )
				, ( outerValue, innerValue ) => outerValue.user ),
			switchMap( user => this.db.tables.User.forceLookup( user, user.email, 'email' ) ),
			switchMap( user => this.db.tables.User.get( user.key ) ),
			map( user => new AuthAction.SetUser( user ) )
		);

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
			switchMap( ( { globalList, category } ) => this.db.tables[ category ].list
				, ( outerValue, innerValue ) => ( { ...outerValue, list: innerValue as KeyValue[] } ) ),
			map( ( { globalList, category, list } ) => ( { list: sqlJoin( globalList, list, 'key' ), category: category } ) ),
			map( ( { list, category } ) => new LayoutAction.Loaded( list, category ) )
		);

		// this.getNavList = this.actions.pipe(
		// 	ofType<LayoutAction.Initialize>( LayoutActionTypes.initialize ),
		// 	map( action => ( [
		// 		{ text: 'Profile', link: Pages.profile },
		// 		{ text: 'Settings', link: Pages.settings },
		// 		{ text: 'Customization', link: Pages.customization },
		// 		{ text: 'Media Library', link: Pages.photoLibrary },
		// 		{ text: 'Tags', link: Pages.settings }
		// 	] ) ),
		// 	map( list => new LayoutAction.LoadNavListSuccess( list ) )
		// );

		this.selectNavItem = this.actions.pipe(
			ofType<LayoutAction.SelectNavItem>( LayoutActionTypes.selectNavItem ),
			map( action => new NavigatorAction.Navigate( action.navItem.link ) )
		);

	}
}

import { Injectable } from "@angular/core";
import { ObservableMedia } from "@angular/flex-layout";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap, filter } from "rxjs/operators";
import { Action, select, Store } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from "./../../core/database.service";
import { LayoutActionTypes, LayoutAction } from "./layout.actions";
import { NavigatorAction, NavigatorActionTypes } from "../../../jam/navigator";
import { Pages } from "../../shared/model/pages.enum";
import { sqlJoin } from "../../../jam/function-library";
import { CoreModuleState } from "../../core/core.store";
import { ScreenSizes } from "../../../jam/model-library";

@Injectable()
export class LayoutEffects
{
	@Effect() public getMetadata: Observable<Action>;
	@Effect() public getNavList: Observable<Action>;
	@Effect() public selectNavItem: Observable<Action>;
	@Effect() public initialize: Observable<Action>;

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

		this.getMetadata = this.actions.pipe(
			ofType<LayoutAction.Initialize>( LayoutActionTypes.initialize ),
			switchMap( action => this.store.pipe(
				select( state => state.databaseState.initialized ),
				filter( initialized => initialized ) ) ),
			switchMap( initialized => this.db.tables.GlobalLayout.filter( 'active', '==', true ) ),
			switchMap( globalList => this.db.tables.Layout.list, ( outerValue, innerValue ) => ( [ outerValue, innerValue ] ) ),
			map( ( [ globalList, list ] ) => sqlJoin( globalList, list, 'key' ) ),
			map( list => new LayoutAction.Initialized( list ) )
		);

		this.getNavList = this.actions.pipe(
			ofType<LayoutAction.Initialize>( LayoutActionTypes.initialize ),
			map( action => ( [
				{ text: 'Profile', link: Pages.profile },
				{ text: 'Settings', link: Pages.settings },
				{ text: 'Customization', link: Pages.customization },
				{ text: 'Media Library', link: Pages.photoLibrary },
				{ text: 'Tags', link: Pages.settings }
			] ) ),
			map( list => new LayoutAction.LoadNavListSuccess( list ) )
		);

		this.selectNavItem = this.actions.pipe(
			ofType<LayoutAction.SelectNavItem>( LayoutActionTypes.selectNavItem ),
			map( action => new NavigatorAction.Navigate( action.navItem.link ) )
		);

	}
}
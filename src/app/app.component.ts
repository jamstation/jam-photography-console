import { Component } from '@angular/core';
import { filter, first, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AppModuleState } from './app.store';
import { NavigatorAction } from '../jam/navigator';
import { DatabaseAction, Table } from '../jam/firestore';
import { NotificationAction } from '../jam/notification';
import { JamLayoutAction } from '../jam/layout';
import { Pages } from './shared/model/pages.enum';
import { database } from '../environments/environment';
import { AuthAction, User } from '../jam/auth';

@Component( {
	selector: 'app-root',
	template: '<router-outlet></router-outlet>'
} )
export class AppComponent
{
	constructor ( private store: Store<AppModuleState> )
	{
		/**
		 * Initialize Eager Modules
		 */
		this.store.dispatch( new NavigatorAction.Initialize( Pages ) );
		this.store.dispatch( new DatabaseAction.Initialize( database.config.metadataPath, [ { key: 'App', value: 'JamPhotography' } ] ) );
		this.store.dispatch( new NotificationAction.Initialize( { content: 'Done', action: 'Ok', duration: 3000, attended: false }, "center", "bottom" ) );
		this.store.dispatch( new JamLayoutAction.Initialize() );
		this.store.pipe(
			select( state => state.databaseState.tables ),
			filter( tables => !!tables ),
			map( tables => tables.find( table => table.name === 'User' ) ),
			filter( userTable => !!userTable ),
			first()
		).subscribe( ( userTable: Table<User> ) => this.store.dispatch( new AuthAction.Initialize( userTable, Pages.register, Pages.signIn ) ) );
		this.store.pipe(
			select( state => state.authState.user ),
			filter( user => !!user ),
			first()
		).subscribe( user => this.store.dispatch( new DatabaseAction.EnterCollection( 'User', user.key ) ) );
	}
}

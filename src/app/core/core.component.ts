import { Component, Inject } from '@angular/core';
import { filter, first, map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CoreModuleState } from './core.store';
import { NavigatorAction } from '../../jam/navigator';
import { DatabaseAction, Table } from '../../jam/firestore';
import { NotificationAction } from '../../jam/notification';
import { LayoutAction } from './../shared/layout/layout.actions';
import { Pages } from '../shared/model/pages.enum';
import { database } from '../../environments/environment';
import { AuthAction, User } from '../../jam/auth';
import { AngularFireAuth } from 'angularfire2/auth';

@Component( {
	selector: 'app-core',
	template: '<router-outlet></router-outlet>'
} )
export class CoreComponent
{
	constructor ( private store: Store<CoreModuleState> )
	{
		/**
		 * Initialize Eager Modules
		 */
		this.store.dispatch( new NavigatorAction.Initialize( Pages ) );
		this.store.dispatch( new DatabaseAction.Initialize( database.config.metadataPath, [ { key: 'App', value: 'JamPhotography' } ] ) );
		this.store.dispatch( new NotificationAction.Initialize( { content: 'Done', action: 'Ok', duration: 100000, attended: false }, "center", "bottom" ) );
		this.store.dispatch( new LayoutAction.Initialize() );
		this.store.pipe(
			select( state => state.databaseState.tables ),
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

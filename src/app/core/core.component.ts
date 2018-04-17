import { Component, Inject } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CoreModuleState } from './core.store';
import { NavigatorAction } from '../../jam/navigator';
import { DatabaseAction } from '../../jam/firestore';
import { NotificationAction } from '../../jam/notification';
import { LayoutAction } from './../shared/layout/layout.actions';
import { Pages } from '../shared/model/pages.enum';
import { database } from '../../environments/environment';
import { AuthAction } from '../../jam/auth';
import { AngularFireAuth } from 'angularfire2/auth';

@Component( {
	selector: 'app-core',
	template: '<app-layout><router-outlet></router-outlet></app-layout>'
} )
export class CoreComponent
{
	constructor ( private store: Store<CoreModuleState> )
	{
		/**
		 * Initialize Eager Modules
		 */
		this.store.dispatch( new NavigatorAction.Initialize( Pages ) );
		this.store.dispatch( new DatabaseAction.Initialize( database.config.metadataPath, [ { key: 'Company', value: 'raja-singaravelu-photography' } ] ) );
		this.store.dispatch( new NotificationAction.Initialize( { content: 'Done', action: 'Ok', duration: 100000, attended: false }, "center", "bottom" ) );
		this.store.dispatch( new LayoutAction.Initialize() );
		this.store.dispatch( new AuthAction.Initialize( Pages.register, Pages.signIn ) );
	}
}

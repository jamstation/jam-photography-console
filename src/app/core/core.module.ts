import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { JamFirestoreModule } from '../../jam/firestore';
import { JamNavigatorModule } from '../../jam/navigator';
import { JamNotificationModule } from '../../jam/notification';
import { JamAuthModule } from '../../jam/auth';

import { environment, database } from '../../environments/environment';

import { routes } from './core.routes';
import { CoreReducer, CoreEffects } from './core.store';
import { DatabaseService } from './database.service';
import { CoreComponent } from './core.component';
import { LayoutModule } from '../shared/layout/layout.module';

@NgModule( {
	declarations: [ CoreComponent ],
	imports: [
		RouterModule.forRoot( routes ),
		StoreModule.forRoot( CoreReducer ),
		EffectsModule.forRoot( CoreEffects ),
		environment.production ? [] : StoreDevtoolsModule.instrument( {
			name: 'Jam Photography Console',
			maxAge: 25,
			serialize: true,
			logOnly: true,
			stateSanitizer: ( state ) =>
			{
				let otherStates: any = {};
				if ( state.photoLibraryState ) {
					otherStates = {
						...otherStates,
						photoLibraryState: {
							...state.photoLibraryState,
							list: [],
							uploadingPhotos: [],
							selectedPhotos: []
						}
					};
				}
				return {
					...state,
					...otherStates,
					databaseState: {
						...state.databaseState,
						tables: state.databaseState.tables.map( table => ( { ...table, db: null, collection: null } ) )
					},
					authState: {
						...state.authState,
						userTable: { ...state.authState.userTable, db: null, collection: null }
					}
				}
			},
			actionSanitizer: ( action ) =>
			{
				switch ( action.type ) {
					case '[PhotoLibrary] addPhotos':
						return { ...action, fileList: [] };
					case '[PhotoLibrary] generateThumbnails':
					case '[PhotoLibrary] upload':
					case '[PhotoLibrary] uploadStarted':
						return { ...action, uploadingPhotos: [] };
					case '[Profile] upload':
						return { ...action, file: '<<LONG_BLOB>>' };
					case '[Profile] uploadStarted':
						return { ...action, photo: null };
					default:
						return action;
				}
			}
		} ),
		AngularFireModule.initializeApp( database.firebaseAppConfig ),
		// AngularFirestoreModule.enablePersistence(),
		JamFirestoreModule.forRoot( database.firebaseAppConfig ),
		JamNavigatorModule,
		JamNotificationModule,
		JamAuthModule,
		LayoutModule
	],
	exports: [ CoreComponent ],
	providers: [ DatabaseService ]
} )
export class CoreModule { }

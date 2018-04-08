import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AngularFireModule } from 'angularfire2';

import { JamFirestoreModule } from '../../jam/firestore';
import { JamNavigatorModule } from '../../jam/navigator';
import { JamNotificationModule } from '../../jam/notification';

import { environment, database } from '../../environments/environment';

import { routes } from './core.routes';
import { CoreReducer, CoreEffects } from './core.store';
import { DatabaseService } from './database.service';
import { CoreComponent } from './core.component';
import { LayoutModule } from '../shared/layout/layout.module';

@NgModule( {
	declarations: [
		CoreComponent
	],
	imports: [
		RouterModule.forRoot( routes ),
		StoreModule.forRoot( CoreReducer ),
		EffectsModule.forRoot( CoreEffects ),
		environment.production ? [] : StoreDevtoolsModule.instrument( { maxAge: 25 } ),
		AngularFireModule.initializeApp( database.firebaseAppConfig ),
		JamFirestoreModule.forRoot( database.firebaseAppConfig ),
		JamNavigatorModule,
		JamNotificationModule,
		LayoutModule
	],
	exports: [
		CoreComponent
	],
	providers: [
		DatabaseService
	]
} )
export class CoreModule { }

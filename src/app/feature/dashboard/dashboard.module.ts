import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import
{
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatGridListModule
} from '@angular/material';

import { JamWindowModule } from '../../../jam/ui-library';
import { JamFirestoreStorageModule } from '../../../jam/firestore-storage';
import { SafePipeModule } from '../../../jam/pipe-library';

import { routes } from './dashboard.routes';
import { DashboardReducer, DashboardEffects } from './dashboard.store';
import { DashboardService } from './dashboard.service';
import { DashboardComponent } from './dashboard.component';

@NgModule( {
	declarations: [ DashboardComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatGridListModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'dashboardState', DashboardReducer ),
		EffectsModule.forFeature( [ DashboardEffects ] ),
		JamWindowModule,
		JamFirestoreStorageModule,
		SafePipeModule
	],
	providers: [ DashboardService ]
} )
export class DashboardModule { }

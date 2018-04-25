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

import { routes } from './home.routes';
import { HomeReducer, HomeEffects } from './home.store';
import { HomeService } from './home.service';
import { HomeComponent } from './home.component';

@NgModule( {
	declarations: [ HomeComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatGridListModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'homeState', HomeReducer ),
		EffectsModule.forFeature( [ HomeEffects ] )
	],
	providers: [ HomeService ]
} )
export class HomeModule { }

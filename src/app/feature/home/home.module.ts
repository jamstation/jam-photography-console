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
	MatGridListModule,
	MatDialogModule,
	MatSelectModule
} from '@angular/material';

import { routes } from './home.routes';
import { HomeReducer } from './home.store';
import { HomeEffects } from './home.effects';
import { HomeService } from './home.service';
import { HomeComponent } from './home.component';
import { CompanyFormComponent } from './company-form.component';

@NgModule( {
	declarations: [ HomeComponent, CompanyFormComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatGridListModule,
		MatDialogModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'homeState', HomeReducer ),
		EffectsModule.forFeature( [ HomeEffects ] )
	],
	providers: [ HomeService ],
	entryComponents: [ CompanyFormComponent ]
} )
export class HomeModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import
{
	MatIconModule,
	MatButtonModule,
	MatListModule,
	MatInputModule,
	MatExpansionModule,
	MatDialogModule,
	MatSlideToggleModule
} from '@angular/material';

import { JamWindowModule } from '../../../jam/ui-library';
import { SettingAccordionModule } from '../../shared/layout/setting-accordion';

import { routes } from './profile.routes';
import { ProfileComponent } from './profile.component';
import { ProfileReducer, ProfileEffects } from './profile.store';

@NgModule( {
	declarations: [
		ProfileComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatListModule,
		MatExpansionModule,
		MatDialogModule,
		MatSlideToggleModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'profileState', ProfileReducer ),
		EffectsModule.forFeature( [ ProfileEffects ] ),
		JamWindowModule,
		SettingAccordionModule
	],
	exports: [
		ProfileComponent
	]
} )
export class ProfileModule { }

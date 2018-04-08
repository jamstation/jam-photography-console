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

import { routes } from './settings.routes';
import { SettingsComponent } from './settings.component';
import { SettingsReducer, SettingsEffects } from './settings.store';
import { SettingAccordionModule } from '../../shared/layout/setting-accordion';

@NgModule( {
	declarations: [
		SettingsComponent
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
		StoreModule.forFeature( 'settingsState', SettingsReducer ),
		EffectsModule.forFeature( [ SettingsEffects ] ),
		JamWindowModule,
		SettingAccordionModule
	],
	exports: [
		SettingsComponent
	]
} )
export class SettingsModule { }

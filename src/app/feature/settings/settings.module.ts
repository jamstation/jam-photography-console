import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JamWindowModule } from '../../../jam/ui-library';
import { SettingAccordionModule } from '../../shared/layout/setting-accordion';
import { LayoutModule } from '../../shared/layout';
import { routes } from './settings.routes';
import { SettingsReducer, SettingsEffects } from './settings.store';
import { SettingsComponent } from './settings.component';

@NgModule( {
	declarations: [ SettingsComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'settingsState', SettingsReducer ),
		EffectsModule.forFeature( [ SettingsEffects ] ),
		JamWindowModule,
		SettingAccordionModule,
		LayoutModule
	]
} )
export class SettingsModule { }

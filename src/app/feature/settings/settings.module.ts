import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JamWindowModule, JamConfirmDialogModule } from '../../../jam/ui-library';
import { LayoutModule, SettingAccordionModule } from '../../shared/layout';
import { routes } from './settings.routes';
import { SettingsReducer, SettingsEffects } from './settings.store';
import { SettingsComponent } from './settings.component';
import { JamConfirmDialogComponent } from '../../../jam/ui-library';

@NgModule( {
	declarations: [ SettingsComponent ],
	imports: [
		CommonModule,
		MatButtonModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'settingsState', SettingsReducer ),
		EffectsModule.forFeature( [ SettingsEffects ] ),
		JamWindowModule,
		JamConfirmDialogModule,
		SettingAccordionModule,
		LayoutModule
	],
	entryComponents: [ JamConfirmDialogComponent ]
} )
export class SettingsModule { }

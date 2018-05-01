import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { JamWindowModule } from '../../../jam/ui-library';
import { LayoutModule, SettingAccordionModule } from '../../shared/layout';
import { routes } from './customization.routes';
import { CustomizationReducer, CustomizationEffects } from './customization.store';
import { CustomizationComponent } from './customization.component';

@NgModule( {
	declarations: [ CustomizationComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'customizationState', CustomizationReducer ),
		EffectsModule.forFeature( [ CustomizationEffects ] ),
		JamWindowModule,
		SettingAccordionModule,
		LayoutModule
	]
} )
export class CustomizationModule { }

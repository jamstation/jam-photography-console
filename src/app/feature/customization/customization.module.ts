import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import
{
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatExpansionModule,
	MatSlideToggleModule,
	MatDialogModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ColorPickerModule } from 'ngx-color-picker';

import { JamWindowModule } from '../../../jam/ui-library';

import { routes } from './customization.routes';
import { CustomizationReducer, CustomizationEffects } from './customization.store';
import { CustomizationComponent } from './customization.component';

@NgModule( {
	declarations: [
		CustomizationComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'customizationState', CustomizationReducer ),
		EffectsModule.forFeature( [ CustomizationEffects ] ),
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatExpansionModule,
		MatDialogModule,
		MatSlideToggleModule,
		ColorPickerModule,
		JamWindowModule
	]
} )
export class CustomizationModule { }

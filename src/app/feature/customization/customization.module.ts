import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppearanceModule } from './appearance';
import { AboutModule } from './about';
// import { UploadModule } from './upload';

import { routes } from './customization.routes';
import { CustomizationReducer, CustomizationEffects } from './customization.store';

@NgModule( {
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'customizationState', CustomizationReducer ),
		EffectsModule.forFeature( [ CustomizationEffects ] ),
		AppearanceModule,
		AboutModule,
		// UploadModule
	]
} )
export class CustomizationModule { }

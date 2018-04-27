import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ToolbarModule } from '../../shared/layout/toolbar';

import { CompanyGuard } from './company.guard';
import { routes } from './company.routes';
import { CompanyReducer, CompanyEffects } from './company.store';
import { CompanyComponent } from './company.component';

@NgModule( {
	declarations: [ CompanyComponent ],
	imports: [
		CommonModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'companyState', CompanyReducer ),
		EffectsModule.forFeature( [ CompanyEffects ] ),
		ToolbarModule
	],
	providers: [ CompanyGuard ]
} )
export class CompanyModule { }

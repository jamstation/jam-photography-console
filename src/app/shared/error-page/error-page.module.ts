import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JamErrorPageModule } from '../../../jam/ui-library';
import { ErrorPageComponent } from './error-page.component';

@NgModule( {
	declarations: [ ErrorPageComponent ],
	imports: [
		CommonModule,
		JamErrorPageModule
	],
	exports: [ ErrorPageComponent ]
} )
export class ErrorPageModule { }

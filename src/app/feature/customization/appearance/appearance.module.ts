import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

import { AppearanceComponent } from './appearance.component';

@NgModule( {
	declarations: [
		AppearanceComponent
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
	],
	exports: [
		AppearanceComponent
	]
} )
export class AppearanceModule { }

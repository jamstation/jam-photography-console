import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import
{
	MatExpansionModule,
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatDialogModule,
	MatSlideToggleModule,
	MatSelectModule
} from '@angular/material';
import { JamTextBoxDialogModule, JamTextBoxDialogComponent } from '../../../../jam/ui-library';
import { SettingAccordionComponent } from './setting-accordion.component';

@NgModule( {
	declarations: [
		SettingAccordionComponent
	],
	imports: [
		CommonModule,
		MatExpansionModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatDialogModule,
		MatSlideToggleModule,
		MatSelectModule,
		JamTextBoxDialogModule
	],
	exports: [
		SettingAccordionComponent
	],
	entryComponents: [
		JamTextBoxDialogComponent
	]
} )
export class SettingAccordionModule { }

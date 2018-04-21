import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import
{
	MatDialogModule,
	MatExpansionModule,
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatSlideToggleModule,
	MatSelectModule
} from '@angular/material';
import { ColorPickerModule } from 'ngx-color-picker';
import { JamTextBoxDialogModule, JamTextBoxDialogComponent } from '../../../../jam/ui-library';
import { SettingAccordionComponent } from './setting-accordion.component';

@NgModule( {
	declarations: [ SettingAccordionComponent ],
	imports: [
		CommonModule,
		FormsModule,
		MatDialogModule,
		MatExpansionModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		MatSlideToggleModule,
		MatSelectModule,
		ColorPickerModule,
		JamTextBoxDialogModule
	],
	exports: [ SettingAccordionComponent ],
	entryComponents: [ JamTextBoxDialogComponent ]
} )
export class SettingAccordionModule { }

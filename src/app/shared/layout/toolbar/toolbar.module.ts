import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import
{
	MatIconModule,
	MatButtonModule,
	MatToolbarModule,
	MatExpansionModule
} from '@angular/material';
import { ToolbarComponent } from './toolbar.component';

@NgModule( {
	declarations: [
		ToolbarComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatToolbarModule,
		MatExpansionModule
	],
	exports: [
		ToolbarComponent
	]
} )
export class ToolbarModule { }

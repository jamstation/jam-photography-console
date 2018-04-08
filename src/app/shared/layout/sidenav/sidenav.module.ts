import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import
{
	MatIconModule,
	MatButtonModule,
	MatSidenavModule,
	MatListModule
} from '@angular/material';
import { SidenavComponent } from './sidenav.component';

@NgModule( {
	declarations: [
		SidenavComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatSidenavModule,
		MatListModule
	],
	exports: [
		SidenavComponent
	]
} )
export class SidenavModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import
{
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatSlideToggleModule
} from '@angular/material';

import { AboutComponent } from './about.component';
import { JamWindowModule } from '../../../../jam/ui-library/jam-window';

@NgModule( {
	declarations: [
		AboutComponent
	],
	imports: [
		CommonModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatSlideToggleModule,
		JamWindowModule
	],
	exports: [
		AboutComponent
	]
} )
export class AboutModule { }

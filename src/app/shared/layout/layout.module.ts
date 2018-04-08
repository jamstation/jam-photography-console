import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavModule } from './sidenav';
import { ToolbarModule } from './toolbar';
import { LayoutComponent } from './layout.component';
import { JamWindowModule } from '../../../jam/ui-library/jam-window';

@NgModule( {
	declarations: [
		LayoutComponent
	],
	imports: [
		JamWindowModule,
		SidenavModule,
		ToolbarModule,
		FlexLayoutModule
	],
	exports: [
		LayoutComponent
	]
} )
export class LayoutModule { }

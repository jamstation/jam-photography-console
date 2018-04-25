import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JamWindowModule } from '../../../jam/ui-library/jam-window';
import { ToolbarModule } from './toolbar';
import { LayoutComponent } from './layout.component';
import { UserGuard } from './user-guard.service';

@NgModule( {
	declarations: [
		LayoutComponent
	],
	imports: [
		JamWindowModule,
		ToolbarModule,
		FlexLayoutModule
	],
	exports: [
		LayoutComponent
	],
	providers: [ UserGuard ]
} )
export class LayoutModule { }

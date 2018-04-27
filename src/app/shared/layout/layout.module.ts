import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JamWindowModule } from '../../../jam/ui-library/jam-window';
import { ToolbarModule } from './toolbar';

@NgModule( {
	imports: [
		JamWindowModule,
		ToolbarModule,
		FlexLayoutModule
	]
} )
export class LayoutModule { }

import { NgModule, ModuleWithProviders } from '@angular/core';
import { DatabaseService } from './database.service';

@NgModule( {
	providers: [ DatabaseService ]
} )
export class CoreModule { }

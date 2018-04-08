import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule, CoreComponent } from './core';

@NgModule( {
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		CoreModule
	],
	bootstrap: [ CoreComponent ]
} )
export class AppModule { }

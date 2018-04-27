import { Component } from '@angular/core';
import { Pages } from '../model';

@Component( {
	selector: 'app-error-page',
	template: '<jam-error-page key="bad-request" [redirectUrl]="pages.home"></jam-error-page>'
} )
export class ErrorPageComponent
{
	public pages = Pages;
}

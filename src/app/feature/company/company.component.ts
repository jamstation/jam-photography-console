import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first, map, filter, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CompanyModuleState, CompanyAction } from './company.store';

@Component( {
	selector: 'app-company',
	templateUrl: './company.component.html',
	styleUrls: [ './company.component.css' ]
} )
export class CompanyComponent
{
	constructor ( private route: ActivatedRoute, private store: Store<CompanyModuleState> )
	{
		// this.route.params.pipe(
		// 	first(),
		// 	map( params => params[ 'Company' ] ),
		// 	filter( companyKey => companyKey !== undefined || companyKey !== null )
		// ).subscribe( companyKey => this.store.dispatch( new CompanyAction.Select( companyKey ) ) );
	}
}

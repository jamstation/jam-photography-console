import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, filter, first, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { DatabaseModuleState, DatabaseAction } from '../../../jam/firestore';
import { DatabaseService } from '../../core';

@Injectable()
export class ConsoleGuard implements CanActivate, CanLoad
{

	constructor ( private store: Store<DatabaseModuleState>, private db: DatabaseService ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{
		// console.log( routerStateSnapshot );
		// const companyName = routerStateSnapshot.url.split( '/' )[ 1 ];

		// if ( companyName !== '{Company}' && companyName !== 'home' ) {
		// 	this.store.dispatch( new DatabaseAction.EnterCollection( 'Company', companyName ) );
		// }
		// Check if company is selected
		return this.store.pipe(
			select( state => state.databaseState.resolvedCollections ),
			filter( collections => !!collections.find( collection => collection.key === 'Company' ) ),
			map( collection => !!collection ),
			first(),
			tap( companyResolved =>
			{
				console.log( ( companyResolved ? '[ check ]' : '[ problem ]' ), 'Company resolved?', companyResolved );
			} ) );

	}

	canLoad ( route: Route ): Observable<boolean>
	{
		// Check if company is selected for lazy loaded modules
		return this.store.pipe(
			select( state => state.databaseState.resolvedCollections ),
			filter( collections => !!collections.find( collection => collection.key === 'Company' ) ),
			map( collection => !!collection ),
			first(),
			tap( companyResolved =>
			{
				console.log( ( companyResolved ? '[ check ]' : '[ problem ]' ), 'Company resolved?', companyResolved );
			} ) );
	}

}

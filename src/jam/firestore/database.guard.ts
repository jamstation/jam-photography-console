import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { filter, take, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { DatabaseModuleState } from './database.state';

@Injectable()
export class DatabaseGuard implements CanActivate, CanLoad
{

	constructor ( private store: Store<DatabaseModuleState> ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{
		// Check if database is loaded
		return this.store.pipe(
			select( state => state.databaseState.initialized ),
			filter( initialized => initialized ),
			take( 1 ),
			tap( initialized =>
			{
				console.log( ( initialized ? '[ check ]' : '[ problem ]' ), 'Database initialized?' );
			} ) );

	}

	canLoad ( route: Route ): Observable<boolean>
	{
		// Check if database is loaded for lazy loaded modules
		return this.store.pipe(
			select( state => state.databaseState.initialized ),
			filter( initialized => initialized ),
			take( 1 ) );
	}

}

import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, filter, first, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { LayoutModuleState } from './layout.state';

@Injectable()
export class UserGuard implements CanActivate, CanLoad
{

	constructor ( private store: Store<LayoutModuleState> ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot,
		routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{
		// Check if user is loaded
		return this.store.pipe(
			select( state => state.authState.user ),
			filter( user => !!user && !!user.key ),
			map( user => !!user ),
			first(),
			tap( userLoaded =>
			{
				console.log( ( userLoaded ? '[ check ]' : '[ problem ]' ), 'User Loaded?', userLoaded );
			} ) );
	}

	canLoad ( route: Route ): Observable<boolean>
	{
		// Check if user is loaded for lazy loaded modules
		return this.store.pipe(
			select( state => state.authState.user ),
			filter( user => !!user && !!user.key ),
			map( user => !!user ),
			first(),
			tap( userLoaded =>
			{
				console.log( ( userLoaded ? '[ check ]' : '[ problem ]' ), 'User Loaded?', userLoaded );
			} ) );
	}

}

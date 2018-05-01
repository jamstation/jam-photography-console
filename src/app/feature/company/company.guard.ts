import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, filter, first, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { DatabaseModuleState, DatabaseAction } from '../../../jam/firestore';
import { NavigatorAction } from '../../../jam/navigator';
import { DatabaseService } from '../../core';
import { Pages } from '../../shared/model';
import { CompanyAction } from './company.store';

@Injectable()
export class CompanyGuard implements CanActivate
{

	constructor ( private store: Store<DatabaseModuleState>, private db: DatabaseService ) { }

	canActivate ( activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot ): Observable<boolean>
	{
		const companyKey: string = activatedRouteSnapshot.params[ 'company' ] || '';

		return this.store.pipe(
			select( state => state.databaseState.resolvedCollections ),
			first(),
			map( collections => !!collections.find( collection => collection.key === 'Company' && collection.value === companyKey ) ),
			switchMap( companyAlreadyResolved => companyAlreadyResolved
				? Observable.of( true )
				: this.db.tables.UserCompany.exists( companyKey ) ),
			tap( companyExists => companyExists && this.store.dispatch( new DatabaseAction.EnterCollection( 'Company', companyKey ) ) ),
			switchMap( companyExists => !companyExists
				? Observable.of( false )
				: this.store.pipe(
					select( state => state.databaseState.resolvedCollections ),
					map( collections => !!collections.find( collection => collection.key === 'Company' && collection.value === companyKey ) ),
					filter( companyResolved => companyResolved ),
					first() ) ),
			tap( companyResolved =>
			{
				console.info( '[CompanyGuard]', 'Company loaded?', companyResolved );
				if ( !companyResolved ) {
					this.store.dispatch( new NavigatorAction.Navigate( Pages.errorPage ) );
				} else {
					this.store.dispatch( new CompanyAction.Select( companyKey ))
				}
			} ) );
	}

}

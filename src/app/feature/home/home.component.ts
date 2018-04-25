import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NavigatorAction } from '../../../jam/navigator';
import { Pages } from '../../shared/model';
import { HomeModuleState } from './home.store';
import { HomeAction } from './home.actions';
import { DatabaseAction } from '../../../jam/firestore';
import { UserCompany } from '../../../jam/model-library';
import { map, first } from 'rxjs/operators';
import { User, AuthAction } from '../../../jam/auth';

@Component( {
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
} )
export class HomeComponent
{

	public pages = Pages;
	public user: Observable<User>;
	public list: Observable<UserCompany[]>;

	constructor ( private store: Store<HomeModuleState> )
	{
		this.user = this.store.pipe( select( state => state.authState.user ) );
		this.list = this.store.pipe( select( state => state.homeState.list ) );

		this.store.dispatch( new HomeAction.Load() );
	}

	public select ( company: UserCompany ): void
	{
		this.store.dispatch( new DatabaseAction.EnterCollection( 'Company', company.key ) );
		this.store.dispatch( new NavigatorAction.Navigate( Pages.dashboard, [ { key: 'company', value: company.key } ] ) );
	}

	public goto ( page: Pages )
	{
		this.store.dispatch( new NavigatorAction.Navigate( page ) );
	}

	public signOut (): void
	{
		this.store.dispatch( new AuthAction.SignOut() );
	}

}

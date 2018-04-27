import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NavigatorAction } from '../../../jam/navigator';
import { Pages } from '../../shared/model';
import { HomeModuleState } from './home.store';
import { HomeAction } from './home.actions';
import { DatabaseAction } from '../../../jam/firestore';
import { UserCompany, ScreenSizes, MatGridData } from '../../../jam/model-library';
import { map, first } from 'rxjs/operators';
import { User, AuthAction } from '../../../jam/auth';

@Component( {
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: [ './home.component.css' ]
} )
export class HomeComponent implements OnInit
{

	public pages = Pages;
	public user: Observable<User>;
	public list: Observable<UserCompany[]>;
	public screenSize: Observable<ScreenSizes>;
	public gridLayoutData: Observable<MatGridData>;

	constructor ( private store: Store<HomeModuleState> )
	{
		this.user = this.store.pipe( select( state => state.authState.user ) );
		this.list = this.store.pipe( select( state => state.homeState.list ) );

		this.store.dispatch( new HomeAction.Load() );
	}

	ngOnInit (): void
	{
		this.screenSize = this.store.pipe(
			select( state => state.layoutState.screenSize )
		);

		this.gridLayoutData = this.screenSize.pipe(
			map( screenSize => this.getGridData( screenSize ) )
		);
	}

	private getGridData ( screenSize: ScreenSizes ): MatGridData
	{
		return [
			{ screenSize: ScreenSizes.extraLarge, cols: 6, rowHeight: '250px' },
			{ screenSize: ScreenSizes.large, cols: 4, rowHeight: '250px' },
			{ screenSize: ScreenSizes.medium, cols: 3, rowHeight: '200px' },
			{ screenSize: ScreenSizes.small, cols: 2, rowHeight: '200px' },
			{ screenSize: ScreenSizes.extraSmall, cols: 1, rowHeight: '200px' }
		].find( gridData => gridData.screenSize == screenSize );
	}

	public select ( company: UserCompany ): void
	{
		this.store.dispatch( new HomeAction.Select( company ) );
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

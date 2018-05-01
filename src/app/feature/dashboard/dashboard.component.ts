import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { KeyValue, ScreenSizes, MatGridData } from '../../../jam/model-library';
import { NavigatorAction } from '../../../jam/navigator';
import { Pages } from '../../shared/model';
import { DashboardModuleState } from './dashboard.store';
import { DashboardAction } from './dashboard.actions';

@Component( {
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ]
} )
export class DashboardComponent implements OnInit
{

	public pages = Pages;
	public screenSize: Observable<ScreenSizes>;
	public gridLayoutData: Observable<MatGridData>;
	public list: Observable<KeyValue<number>[]>;
	public photoCount: Observable<number>;
	public storageUsage: Observable<number>;
	public consolePages: { name: string, link: Pages, color: string }[];

	constructor ( private store: Store<DashboardModuleState> )
	{
		this.list = this.store.pipe( select( state => state.dashboardState.list ) );
		this.photoCount = this.list.pipe(
			map( list => list.find( item => item.key == 'photo-count' ) ),
			map( item => ( item || { value: 0 } ).value )
		);
		this.storageUsage = this.list.pipe(
			map( list => list.find( item => item.key == 'storage-usage' ) ),
			map( item => ( item || { value: 0 } ).value ),
			map( value => Math.round( value / ( 1024 * 102.4 ) ) / 10 )
		);

		this.consolePages = [
			{ name: 'Media Library', link: Pages.photoLibrary, color: '' },
			{ name: 'Tags', link: Pages.tag, color: '' },
			{ name: 'Customization', link: Pages.customization, color: '' },
			{ name: 'Settings', link: Pages.settings, color: '' }
		];

		this.store.dispatch( new DashboardAction.Load() );
	}

	ngOnInit (): void
	{
		this.screenSize = this.store.pipe(
			select( state => state.jamLayoutState.screenSize )
		);

		this.gridLayoutData = this.screenSize.pipe(
			map( screenSize => this.getGridData( screenSize ) )
		);
	}

	private getGridData ( screenSize: ScreenSizes ): MatGridData
	{
		return [
			{ screenSize: ScreenSizes.extraLarge, cols: 4, rowHeight: '250px' },
			{ screenSize: ScreenSizes.large, cols: 3, rowHeight: '250px' },
			{ screenSize: ScreenSizes.medium, cols: 3, rowHeight: '200px' },
			{ screenSize: ScreenSizes.small, cols: 2, rowHeight: '200px' },
			{ screenSize: ScreenSizes.extraSmall, cols: 1, rowHeight: '200px' }
		].find( gridData => gridData.screenSize == screenSize );
	}

	public goto ( page: Pages ): void
	{
		this.store.dispatch( new NavigatorAction.Navigate( page ) );
	}

}

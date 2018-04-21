import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { KeyValue } from '../../../jam/model-library';
import { NavigatorAction } from '../../../jam/navigator';
import { Pages } from '../../shared/model';
import { DashboardModuleState } from './dashboard.store';
import { DashboardAction } from './dashboard.actions';

@Component( {
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: [ './dashboard.component.css' ]
} )
export class DashboardComponent
{

	public pages = Pages;
	public list: Observable<KeyValue<number>[]>;
	public photoCount: Observable<number>;
	public storageUsage: Observable<number>;

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

		this.store.dispatch( new DashboardAction.Load() );
	}

	public goto ( page: Pages ): void
	{
		this.store.dispatch( new NavigatorAction.Navigate( page ) );
	}

}

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { SettingsAction } from './settings.actions';
import { SettingsModuleState } from './settings.store';
import { LayoutItem } from '../../../jam/model-library';
import { uniqueList, splitArrayByValues } from '../../../jam/function-library';

@Component( {
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: [ './settings.component.css' ]
} )
export class SettingsComponent
{

	list: Observable<LayoutItem[]>;
	groups: Observable<LayoutItem[]>;
	lists: Observable<LayoutItem[][]>;

	constructor ( private store: Store<SettingsModuleState> )
	{

		this.list = this.store.pipe(
			select( state => state.layoutState.list
				.filter( item => item.category == 'settings' )
				.sort( ( a, b ) => a.index - b.index ) )
		);

		this.lists = this.list.pipe(
			map( list => splitArrayByValues( list, 'groupIndex' ) ),
			filter( list => list.length > 0 )
		);

		this.groups = this.list.pipe(
			map( list => uniqueList( list, 'groupIndex' ) )
		);

	}

	public edited ( item: LayoutItem ): void
	{
		this.store.dispatch( new SettingsAction.Modify( item ) );
	}

}

import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ProfileAction } from './profile.actions';
import { ProfileModuleState } from './profile.store';
import { LayoutItem } from '../../../jam/model-library';
import { uniqueList, splitArrayByValues } from '../../../jam/function-library';
import { CoreModuleState } from '../../core/core.store';

@Component( {
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
} )
export class ProfileComponent
{

	list: Observable<LayoutItem[]>;
	groups: Observable<LayoutItem[]>;
	lists: Observable<LayoutItem[][]>;

	constructor ( private store: Store<CoreModuleState> )
	{

		this.list = this.store.pipe(
			select( state => state.layoutState.list
				.filter( item => item.category == 'profile' )
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
		this.store.dispatch( new ProfileAction.Modify( item ) );
	}

}

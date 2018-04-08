import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs/operators';
import { NavItem } from './../../jam/model-library';
import { Pages } from '../shared/model/pages.enum';
import { CoreModuleState } from './core.store';
import { Tables } from './tables.model';
import { LayoutItem } from '../../jam/model-library/layout-item.model';

@Injectable()
export class DatabaseService
{

	public tables: Tables;

	constructor ( private store: Store<CoreModuleState> )
	{
		this.store.pipe(
			select( state => state.databaseState.tables ),
			filter( tables => !!tables )
		).subscribe( tables =>
		{
			this.tables = new Tables();
			tables.forEach( table => this.tables[ table.name ] = table );
		} );
	}

}

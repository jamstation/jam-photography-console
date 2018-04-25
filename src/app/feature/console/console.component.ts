import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NavigatorAction } from '../../../jam/navigator';
import { Pages, Company } from '../../shared/model';
import { ConsoleModuleState } from './console.store';
import { ConsoleAction } from './console.actions';
import { DatabaseAction } from '../../../jam/firestore';

@Component( {
	selector: 'app-console',
	templateUrl: './console.component.html',
	styleUrls: [ './console.component.css' ]
} )
export class ConsoleComponent
{

	public pages = Pages;
	public list: Observable<Company[]>;

	constructor ( private store: Store<ConsoleModuleState> )
	{
		this.list = this.store.pipe( select( state => state.consoleState.list ) );
		this.store.dispatch( new ConsoleAction.Load() );
	}

	public select ( company: Company ): void
	{
		this.store.dispatch( new DatabaseAction.EnterCollection( 'Company', company.key ) );
		this.store.dispatch( new NavigatorAction.Navigate( Pages.dashboard, [ { key: 'company', value: company.id } ] ) );
	}

}

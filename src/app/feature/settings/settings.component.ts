import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LayoutItem } from '../../../jam/model-library';
import { LayoutAction } from '../../shared/layout';
import { SettingsModuleState, SettingsAction } from './settings.store';

@Component( {
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: [ './settings.component.css' ]
} )
export class SettingsComponent
{
	constructor ( private store: Store<SettingsModuleState> )
	{
		this.store.dispatch( new LayoutAction.Load( 'Settings' ) );
	}

	public modify ( layoutItem: LayoutItem )
	{
		const item = { key: layoutItem.key, value: layoutItem.newValue$ };
		this.store.dispatch( new SettingsAction.Modify( item ) );
	}

	public shutdownCompany ( layoutItem: LayoutItem ): void
	{
		this.store.dispatch( new SettingsAction.ShutdownCompany() );
	}

}

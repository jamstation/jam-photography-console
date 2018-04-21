import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LayoutItem } from '../../../jam/model-library';
import { LayoutAction } from '../../shared/layout';
import { CustomizationModuleState, CustomizationAction } from './customization.store';

@Component( {
	selector: 'app-customization',
	templateUrl: './customization.component.html',
	styleUrls: [ './customization.component.css' ]
} )
export class CustomizationComponent
{

	constructor ( private store: Store<CustomizationModuleState> )
	{
		this.store.dispatch( new LayoutAction.Load( 'Customization' ) );
	}

	public modify ( layoutItem: LayoutItem )
	{
		const item = { key: layoutItem.key, value: layoutItem.newValue$ };
		this.store.dispatch( new CustomizationAction.Modify( item ) );
	}

}

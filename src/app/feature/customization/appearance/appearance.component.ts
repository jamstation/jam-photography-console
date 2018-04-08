import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CustomizationAction, CustomizationModuleState } from '../customization.store';
import { Metadata } from '../../../../jam/model-library';
import { convertToIndexedArray } from '../../../../jam/function-library';

@Component( {
	selector: 'app-customization-appearance',
	templateUrl: './appearance.component.html',
	styleUrls: [ './appearance.component.css' ]
} )
export class AppearanceComponent
{

	private list$: Observable<Metadata[]>;

	constructor ( private store: Store<CustomizationModuleState> )
	{
		this.store.dispatch( new CustomizationAction.Load() );

		this.list$ = this.store.pipe(
			select( state => state.customizationState.list ),
			map( list => convertToIndexedArray( list, 'name' ) ),
		);
	}

	private edit ( setting: Metadata ): void
	{
		this.store.dispatch( new CustomizationAction.Edit( setting ) );
	}

}

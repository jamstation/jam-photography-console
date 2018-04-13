import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { CoreModuleState } from '../../../core/core.store';
import { LayoutAction } from '../layout.actions';
import { Pages } from '../../model';
import { ScreenSizes } from '../../../../jam/model-library';

@Component( {
	selector: 'app-layout-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: [ './toolbar.component.css' ]
} )
export class ToolbarComponent
{

	public screenSize: Observable<ScreenSizes>;
	public companyTitle: Observable<string>;
	public toolbar: string[];
	public pages = Pages;

	constructor ( private store: Store<CoreModuleState> )
	{
		this.toolbar = [];
		this.companyTitle = Observable.of( 'Jam Photography Console' );
		this.screenSize = this.store.pipe( select( state => state.layoutState.screenSize ) );
	}

	public expand ( row: number, name?: string ): void
	{
		this.toolbar = this.toolbar[ row ]
			? this.toolbar.slice( 0, row )
			: this.toolbar.concat( name );
	}

	public menuClick (): void
	{
		// this.store.dispatch( new LayoutAction.ToggleSidebar() );
	}

	public goto ( page: Pages ): void
	{
		const navItem = { text: '', link: page };
		this.store.dispatch( new LayoutAction.SelectNavItem( navItem ) );
	}

}
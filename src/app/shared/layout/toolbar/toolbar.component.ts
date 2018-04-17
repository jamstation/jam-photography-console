import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import { ScreenSizes } from '../../../../jam/model-library';
import { User, AuthAction } from '../../../../jam/auth';
import { CoreModuleState } from '../../../core/core.store';
import { LayoutAction } from '../layout.actions';
import { Pages } from '../../model';

@Component( {
	selector: 'app-layout-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: [ './toolbar.component.css' ]
} )
export class ToolbarComponent
{

	public screenSize: Observable<ScreenSizes>;
	public companyTitle: Observable<string>;
	public user: Observable<User>;
	public pages = Pages;

	constructor ( private store: Store<CoreModuleState> )
	{
		this.screenSize = this.store.pipe( select( state => state.layoutState.screenSize ) );
		this.companyTitle = Observable.of( 'Jam Photography Console' );
		this.user = this.store.pipe( select( state => state.authState.user ) );
	}

	public goto ( page: Pages ): void
	{
		const navItem = { text: '', link: page };
		this.store.dispatch( new LayoutAction.SelectNavItem( navItem ) );
	}

}

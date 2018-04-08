import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { map, skip, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CoreModuleState } from '../../../core/core.store';
import { NavItem } from '../../../../jam/model-library';
import { LayoutAction } from '../layout.actions';

@Component( {
	selector: 'app-layout-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: [ './sidenav.component.css' ]
} )
export class SidenavComponent implements OnInit
{
	@ViewChild( 'sidenav' ) public sidenav: MatSidenav;
	public logoUrl: Observable<string>;
	public navList: Observable<NavItem[]>;

	constructor ( private store: Store<CoreModuleState> )
	{
		this.navList = this.store.pipe(
			select( state => state.layoutState.navList ) );
	}

	ngOnInit (): void
	{
		this.store.pipe(
			select( state => state.layoutState.sidebarToggled ),
			skip( 1 ),
			map( sidebarToggled => this.sidenav.toggle() ) )
			.subscribe();
	}

	public select ( navItem: NavItem ): void
	{
		this.sidenav.close();
		this.store.dispatch( new LayoutAction.SelectNavItem( navItem ) );
	}

}

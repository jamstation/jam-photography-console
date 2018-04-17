import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ProfileAction } from './profile.actions';
import { ProfileModuleState } from './profile.store';
import { LayoutItem } from '../../../jam/model-library';
import { uniqueList, splitArrayByValues } from '../../../jam/function-library';
import { CoreModuleState } from '../../core/core.store';
import { User, AuthAction } from '../../../jam/auth';

@Component( {
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
} )
export class ProfileComponent
{

	public user: Observable<User>;

	constructor ( private store: Store<CoreModuleState> )
	{
		this.user = this.store.pipe( select( state => state.authState.user ), map( user => ( { ...user, displayName: '' } ) ) );
	}

	public signOut (): void
	{
		this.store.dispatch( new AuthAction.SignOut() );
	}

	public edited ( item: LayoutItem ): void
	{
		this.store.dispatch( new ProfileAction.Modify( item ) );
	}

}

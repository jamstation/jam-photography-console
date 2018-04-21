import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ProfileAction } from './profile.actions';
import { ProfileModuleState } from './profile.store';
import { LayoutItem } from '../../../jam/model-library';
import { uniqueList, splitArrayByValues } from '../../../jam/function-library';
import { User, AuthAction } from '../../../jam/auth';

@Component( {
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: [ './profile.component.css' ]
} )
export class ProfileComponent
{

	public user$: Observable<User>;
	public user: User;

	constructor ( private store: Store<ProfileModuleState> )
	{
		this.user$ = this.store.pipe( select( state => state.authState.user ) );
		this.user$.subscribe( user => this.user = user );
	}

	/**
	 * Dispatch Upload action
	 * @param fileList files selected by user to upload
	 */
	public uploadPhoto ( fileList: FileList ): void
	{
		const file = fileList.item( 0 );
		if ( !file || file.type.split( '/' )[ 0 ] != 'image' ) return;
		this.store.dispatch( new ProfileAction.Upload( file ) );
	}

	public edit (): void
	{
		this.store.dispatch( new ProfileAction.Edit( this.user ) );
	}

	public signOut (): void
	{
		this.store.dispatch( new AuthAction.SignOut() );
	}

}

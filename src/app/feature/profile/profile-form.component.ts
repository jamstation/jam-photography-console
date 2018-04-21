import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { map, first, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { User } from '../../../jam/auth';
import { ProfileModuleState } from './profile.state';
import { ProfileAction } from './profile.actions';

@Component( {
	selector: 'app-profile-form',
	templateUrl: './profile-form.component.html',
	styleUrls: [ './profile-form.component.css' ]
} )
export class ProfileFormComponent
{

	public form: FormGroup;
	public formItem: User;
	public creating: boolean;

	constructor ( private store: Store<ProfileModuleState>, private formBuilder: FormBuilder )
	{
		/**
		 * Store Selects
		 */
		this.store.pipe(
			select( state => state.profileState.formItem ),
			filter( formItem => !!formItem ),
			first()
		)
			.subscribe( formItem =>
			{
				this.formItem = formItem;
				this.form = this.formBuilder.group( {
					displayName: [ this.formItem.displayName ]
				} );
			} )
	}

	public submit (): void
	{
		this.formItem = {
			email: null,
			displayName: this.form.get( 'displayName' ).value
		};
		this.store.dispatch( new ProfileAction.Modify( this.formItem ) )
	}

	public cancel (): void
	{
		this.store.dispatch( new ProfileAction.CancelEdit() );
	}

}

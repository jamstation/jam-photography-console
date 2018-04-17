import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { AuthModuleState } from './jam-auth.state';
import { AuthAction } from './jam-auth.actions';
import { AuthFormValidators } from './auth-form-validators.directive';
import { Credential } from './credential.model';

@Component( {
	selector: 'jam-auth-register',
	templateUrl: './register.component.html',
	styleUrls: [ './register.component.css' ]
} )
export class RegisterComponent
{

	private form: FormGroup;
	private uiWidth: Observable<string>;
	private uiHeight: Observable<string>;

	constructor ( private store: Store<AuthModuleState>, private formBuilder: FormBuilder )
	{
		this.form = this.formBuilder.group( {
			email: new FormControl( '', [ Validators.required ] ),
			password: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] ),
			confirmPassword: new FormControl( '', [ Validators.required, Validators.minLength( 6 ) ] )
		} );
		this.confirmPassword.setValidators( AuthFormValidators.confirmPasswordValidator( this.password ) );
		this.uiWidth = this.store.pipe( select( state => state.authState.uiWidth ), first() );
		this.uiHeight = this.store.pipe( select( state => state.authState.uiHeight ), first() );
	}

	private submit ()
	{
		if ( this.form.invalid ) return;
		const credential = { email: this.email.value, password: this.password.value };
		this.store.dispatch( new AuthAction.Register( credential ) );
	}

	private requestSignInPage ()
	{
		this.store.dispatch( new AuthAction.RequestSignInPage() );
	}

	private get email (): AbstractControl
	{
		return this.form.get( 'email' );
	}

	private get password (): AbstractControl
	{
		return this.form.get( 'password' );
	}

	private get confirmPassword (): AbstractControl
	{
		return this.form.get( 'confirmPassword' );
	}

}

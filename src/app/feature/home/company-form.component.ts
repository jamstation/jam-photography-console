import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSelect, MatOption } from '@angular/material';
import { Observable } from 'rxjs';
import { map, tap, first } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Company } from '../../shared/model';
import { HomeModuleState, HomeAction } from './home.store';
import { LayoutAction } from '../../shared/layout';

@Component( {
	selector: 'app-company-form',
	templateUrl: './company-form.component.html',
	styleUrls: [ './company-form.component.css' ]
} )
export class CompanyFormComponent
{

	public form: FormGroup;
	public formItem: Company;
	public subscriptions: Observable<string[]>;

	constructor ( private store: Store<HomeModuleState>, private formBuilder: FormBuilder )
	{
		this.formItem = {
			name: null,
			id: null,
			userKey: null,
			subscription: null
		}

		this.store.pipe(
			select( state => state.authState.user ),
			first()
		).subscribe( user =>
		{
			this.formItem = {
				...this.formItem,
				userKey: user.key,
			}
		} );

		this.form = this.formBuilder.group( {
			name: [ this.formItem.name, Validators.required ]
		} );

		this.store.dispatch( new LayoutAction.Load( 'Settings' ) );

		this.subscriptions = this.store.pipe(
			select( state => state.layoutState.list ),
			map( list => list.find( item => item.category == 'Settings' && item.name == 'subscription' ) ),
			map( item => item && item.options ? item.options : [] ),
			tap( subscriptions => this.formItem.subscription = subscriptions[ 0 ] || null )
		);
	}

	public submit (): void
	{
		this.formItem.name = this.form.get( 'name' ).value;
		this.formItem.id = this.formItem.name.replace( /\s+/, '-' ).toLocaleLowerCase();
		this.formItem.key = this.formItem.id;
		this.store.dispatch( new HomeAction.Add( this.formItem ) );
	}

	public cancel (): void
	{
		this.store.dispatch( new HomeAction.CancelCreate() );
	}

}

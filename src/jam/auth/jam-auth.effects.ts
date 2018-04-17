import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, switchMap, withLatestFrom, filter, tap } from 'rxjs/operators';
import { Action, Store, select } from '@ngrx/store';
import { Effect, Actions, ofType } from "@ngrx/effects";
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthModuleState } from './jam-auth.state';
import { AuthActionTypes, AuthAction } from "./jam-auth.actions";
import { NavigatorAction } from "../navigator";

@Injectable()
export class AuthEffects
{
	@Effect() initialize: Observable<Action>;
	@Effect() requestRegisterPage: Observable<Action>;
	@Effect() requestSignInPage: Observable<Action>;
	@Effect() register: Observable<Action>;
	@Effect() registered: Observable<Action>;
	@Effect() signIn: Observable<Action>;
	@Effect() signedIn: Observable<Action>;
	@Effect() signOut: Observable<Action>;
	@Effect() signedOut: Observable<Action>;
	@Effect() deleteUser: Observable<Action>;

	constructor (
		private actions: Actions,
		private store: Store<AuthModuleState>,
		private angularFireAuth: AngularFireAuth
	)
	{

		this.initialize = this.actions.pipe(
			ofType<AuthAction.Initialize>( AuthActionTypes.initialize ),
			// .map( action => ( { email: 'amsakanna@gmail.com' } ) ),
			switchMap( action => this.angularFireAuth.authState ),
			map( firebaseUser => firebaseUser
				? new AuthAction.Authenticated( firebaseUser )
				: new AuthAction.Deauthenticated() ) );

		this.requestRegisterPage = this.actions.pipe(
			ofType<AuthAction.RequestRegisterPage>( AuthActionTypes.requestRegisterPage ),
			withLatestFrom( this.store.pipe( map( state => state.authState.registerPage ) ) ),
			map( ( [ action, registerPage ] ) => registerPage ),
			filter( registerPage => !!registerPage ),
			map( registerPage => new NavigatorAction.Navigate( registerPage ) ) );

		this.requestSignInPage = this.actions.pipe(
			ofType<AuthAction.RequestSignInPage>( AuthActionTypes.requestSignInPage ),
			withLatestFrom( this.store.pipe( map( state => state.authState.signInPage ) ) ),
			map( ( [ action, signInPage ] ) => signInPage ),
			filter( signInPage => !!signInPage ),
			map( signInPage => new NavigatorAction.Navigate( signInPage ) ) );

		this.register = this.actions.pipe(
			ofType<AuthAction.Register>( AuthActionTypes.register ),
			switchMap( action => this.angularFireAuth.auth.createUserWithEmailAndPassword( action.credential.email, action.credential.password ) ),
			map( error => !error.code
				? new AuthAction.Registered()
				: new AuthAction.RegisterFailed( error.code, error.message ) ) );

		this.registered = this.actions.pipe(
			ofType<AuthAction.Registered>( AuthActionTypes.registered ),
			withLatestFrom( this.store.pipe( map( state => state.authState.redirectUrl ) ) ),
			map( ( [ action, redirectUrl ] ) => new NavigatorAction.RouteResolved( redirectUrl ) ) );

		this.signIn = this.actions.pipe(
			ofType<AuthAction.SignIn>( AuthActionTypes.signIn ),
			switchMap( action => this.angularFireAuth.auth.signInWithEmailAndPassword( action.credential.email, action.credential.password ) ),
			map( error => !error.code
				? new AuthAction.SignedIn()
				: new AuthAction.SignInFailed( error.code, error.message ) ) );

		this.signedIn = this.actions.pipe(
			ofType<AuthAction.SignedIn>( AuthActionTypes.signedIn ),
			withLatestFrom( this.store.pipe( map( state => state.authState.redirectUrl ) ) ),
			map( ( [ action, redirectUrl ] ) => new NavigatorAction.RouteResolved( redirectUrl ) ) );

		this.signOut = this.actions.pipe(
			ofType<AuthAction.SignOut>( AuthActionTypes.signOut ),
			switchMap( action => this.angularFireAuth.auth.signOut() ),
			map( error => !error
				? new AuthAction.SignedOut()
				: new AuthAction.SignOutFailed( error.code, error.message ) ) );

		this.signedOut = this.actions.pipe(
			ofType<AuthAction.SignedOut>( AuthActionTypes.signedOut ),
			map( action => new NavigatorAction.RouteResolved( '/' ) ) );

		this.deleteUser = this.actions.pipe(
			ofType<AuthAction.DeleteUser>( AuthActionTypes.deleteUser ),
			switchMap( action => this.angularFireAuth.auth.currentUser.delete() ),
			map( error => !error.code
				? new AuthAction.DeletedUser()
				: new AuthAction.DeleteUserFailed( error.code, error.message ) ) );

	}
}

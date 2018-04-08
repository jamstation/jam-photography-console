import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material";
import { Action, Store } from "@ngrx/store";
import { Effect, Actions, ofType } from '@ngrx/effects';
import { NotificationModuleState } from './jam-notification.state';
import { NotificationAction, NotificationActionTypes } from './jam-notification.action';
import { NotificationMessage } from "./notification-message.model";

@Injectable()
export class NotificationEffects
{
	@Effect() public open$: Observable<Action>;

	constructor (
		private actions$: Actions,
		private store: Store<NotificationModuleState>,
		private matSnackBar: MatSnackBar
	)
	{

		this.open$ = this.actions$.pipe(
			ofType<NotificationAction.Open>( NotificationActionTypes.open ),
			withLatestFrom( this.store.select( state => state.notificationState.defaultMessage ) ),
			map( ( [ action, defaultMessage ] ) => ( {
				content: action.message.content || defaultMessage.content,
				action: action.message.action || defaultMessage.action,
				duration: action.message.duration || defaultMessage.duration
			} ) ),
			withLatestFrom(
				this.store.select( state => state.notificationState.horizontalPosition ),
				this.store.select( state => state.notificationState.verticalPosition ),
				this.store.select( state => state.notificationState.viewContainerRef )
			),
			map( ( [ message, horizontalPosition, verticalPosition, viewContainerRef ] ) => this.matSnackBar.open(
				message.content,
				message.action,
				{
					duration: message.duration,
					horizontalPosition: horizontalPosition,
					verticalPosition: verticalPosition,
					viewContainerRef: viewContainerRef
				} ) ),
			switchMap( snackBar => snackBar.afterDismissed() ),
			map( closed => new NotificationAction.Closed() ) );
	}

}

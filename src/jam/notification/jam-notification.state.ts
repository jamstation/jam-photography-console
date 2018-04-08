import { ViewContainerRef } from '@angular/core';
import { NotificationMessage } from './notification-message.model';
import { MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material';

export interface NotificationModuleState
{
	notificationState: NotificationState
}

export interface NotificationState
{
	notifying: boolean;
	defaultMessage: NotificationMessage;
	currentMessage: NotificationMessage;
	messageHistory: NotificationMessage[];
	horizontalPosition: MatSnackBarHorizontalPosition,
	verticalPosition: MatSnackBarVerticalPosition,
	viewContainerRef: ViewContainerRef;
}

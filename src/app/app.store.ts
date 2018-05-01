import { ActionReducerMap } from "@ngrx/store";

import { LayoutState, LayoutReducer, LayoutEffects } from './shared/layout';
import { DatabaseState, DatabaseReducer, DatabaseEffects } from "./../jam/firestore";
import { NavigatorState, NavigatorReducer, NavigatorEffects } from "./../jam/navigator";
import { NotificationState, NotificationReducer, NotificationEffects } from "./../jam/notification";
import { AuthState, AuthReducer, AuthEffects } from "./../jam/auth";
import { JamLayoutState, JamLayoutReducer, JamLayoutEffects } from "../jam/layout";

/**
 * All States
 */
export interface AppModuleState
{
	layoutState: LayoutState;
	databaseState: DatabaseState;
	navigatorState: NavigatorState;
	notificationState: NotificationState;
	authState: AuthState;
	jamLayoutState: JamLayoutState
}

/**
 * All Reducers
 */
export const AppReducer: ActionReducerMap<AppModuleState> = {
	layoutState: LayoutReducer,
	databaseState: DatabaseReducer,
	navigatorState: NavigatorReducer,
	notificationState: NotificationReducer,
	authState: AuthReducer,
	jamLayoutState: JamLayoutReducer
}

/**
 * All Effects
 */
export const AppEffects = [
	LayoutEffects,
	DatabaseEffects,
	NavigatorEffects,
	NotificationEffects,
	AuthEffects,
	JamLayoutEffects
]

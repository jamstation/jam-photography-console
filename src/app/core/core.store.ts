import { ActionReducerMap } from "@ngrx/store";

import { LayoutState, LayoutReducer, LayoutEffects } from '../shared/layout';
import { DatabaseState, DatabaseReducer, DatabaseEffects } from "../../jam/firestore";
import { NavigatorState, NavigatorReducer, NavigatorEffects } from "../../jam/navigator";
import { NotificationState, NotificationReducer, NotificationEffects } from "../../jam/notification";
import { AuthState, AuthReducer, AuthEffects } from "../../jam/auth";

/**
 * All States
 */
export interface CoreModuleState
{
	layoutState: LayoutState;
	databaseState: DatabaseState;
	navigatorState: NavigatorState;
	notificationState: NotificationState;
	authState: AuthState;
}

/**
 * All Reducers
 */
export const CoreReducer: ActionReducerMap<CoreModuleState> = {
	layoutState: LayoutReducer,
	databaseState: DatabaseReducer,
	navigatorState: NavigatorReducer,
	notificationState: NotificationReducer,
	authState: AuthReducer
}

/**
 * All Effects
 */
export const CoreEffects = [
	LayoutEffects,
	DatabaseEffects,
	NavigatorEffects,
	NotificationEffects,
	AuthEffects
]

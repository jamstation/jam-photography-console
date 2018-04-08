import { ActionReducerMap } from "@ngrx/store";

import { LayoutState, LayoutReducer, LayoutEffects } from '../shared/layout';
import { DatabaseState, DatabaseReducer, DatabaseEffects } from "../../jam/firestore";
import { NavigatorState, NavigatorReducer, NavigatorEffects } from "../../jam/navigator";
import { NotificationState, NotificationReducer, NotificationEffects } from "../../jam/notification";

/**
 * All States
 */
export interface CoreModuleState
{
	layoutState: LayoutState;
	databaseState: DatabaseState;
	navigatorState: NavigatorState;
	notificationState: NotificationState;
}

/**
 * All Reducers
 */
export const CoreReducer: ActionReducerMap<CoreModuleState> = {
	layoutState: LayoutReducer,
	databaseState: DatabaseReducer,
	navigatorState: NavigatorReducer,
	notificationState: NotificationReducer
}

/**
 * All Effects
 */
export const CoreEffects = [
	LayoutEffects,
	DatabaseEffects,
	NavigatorEffects,
	NotificationEffects
]

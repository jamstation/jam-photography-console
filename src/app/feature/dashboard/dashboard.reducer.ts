import { DashboardState } from './dashboard.state';
import { DashboardActionTypes, DashboardAction } from './dashboard.actions';

const initialState: DashboardState = {
	processing: false,
	list: []
}

export function DashboardReducer ( state = initialState, action: DashboardAction.All ): DashboardState
{
	switch ( action.type ) {

		case DashboardActionTypes.load:
			return { ...state, processing: true }

		case DashboardActionTypes.loaded:
			return {
				...state,
				processing: false,
				list: action.list
			}

		case DashboardActionTypes.loadFailed:
			return { ...state, processing: false }

		default:
			return state;
	}
}

import { ConsoleState } from './console.state';
import { ConsoleActionTypes, ConsoleAction } from './console.actions';

const initialState: ConsoleState = {
	processing: false,
	list: []
}

export function ConsoleReducer ( state = initialState, action: ConsoleAction.All ): ConsoleState
{
	switch ( action.type ) {

		case ConsoleActionTypes.load:
			return { ...state, processing: true }

		case ConsoleActionTypes.loaded:
			return {
				...state,
				processing: false,
				list: action.list
			}

		case ConsoleActionTypes.loadFailed:
			return { ...state, processing: false }

		default:
			return state;
	}
}

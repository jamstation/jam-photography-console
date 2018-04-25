import { HomeState } from './home.state';
import { HomeActionTypes, HomeAction } from './home.actions';

const initialState: HomeState = {
	processing: false,
	list: []
}

export function HomeReducer ( state = initialState, action: HomeAction.All ): HomeState
{
	switch ( action.type ) {

		case HomeActionTypes.load:
			return { ...state, processing: true }

		case HomeActionTypes.loaded:
			return {
				...state,
				processing: false,
				list: action.list
			}

		case HomeActionTypes.loadFailed:
			return { ...state, processing: false }

		default:
			return state;
	}
}

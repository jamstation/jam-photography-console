import { HomeState } from './home.state';
import { HomeActionTypes, HomeAction } from './home.actions';

const initialState: HomeState = {
	processing: false,
	creating: false,
	list: [],
	selectedItem: null
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

		case HomeActionTypes.select:
			return { ...state, selectedItem: action.item }

		case HomeActionTypes.create:
			return { ...state, creating: true }

		case HomeActionTypes.cancelCreate:
			return { ...state, creating: false }

		case HomeActionTypes.added:
			return { ...state, creating: false }

		case HomeActionTypes.addFailed:
			return { ...state, creating: false }

		default:
			return state;
	}
}

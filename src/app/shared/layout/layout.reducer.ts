import { LayoutState } from './layout.state';
import { LayoutActionTypes, LayoutAction } from './layout.actions';
import { ScreenSizes } from '../../../jam/model-library';

const initialState: LayoutState = {
	processing: false,
	list: []
}

export function LayoutReducer ( state = initialState, action: LayoutAction.All ): LayoutState
{
	switch ( action.type ) {

		case LayoutActionTypes.load:
			return {
				...state,
				processing: true
			};

		case LayoutActionTypes.loaded:
			return {
				...state,
				processing: false,
				list: state.list
					.filter( item => item.category !== action.category )
					.concat( action.newList )
			};

		case LayoutActionTypes.loadFailed:
			return {
				...state,
				processing: false
			};

		default:
			return state;
	}
}

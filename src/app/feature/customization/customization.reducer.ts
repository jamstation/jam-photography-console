import { CustomizationState } from './customization.state';
import { CustomizationActionTypes, CustomizationAction } from './customization.actions';

const initialState: CustomizationState = {
	list: [],
	processing: false,
	editing: false
}

export function CustomizationReducer ( state = initialState, action: CustomizationAction.All ): CustomizationState
{
	switch ( action.type ) {

		case CustomizationActionTypes.load:
			return {
				...state,
				processing: true
			};

		case CustomizationActionTypes.loaded:
			return {
				...state,
				processing: false,
				list: action.list
			};

		case CustomizationActionTypes.edit:
			return {
				...state,
				editing: true
			};

		case CustomizationActionTypes.edited:
			return {
				...state,
				editing: false,
				list: state.list.map( item => item.name == action.result.key
					? ( { ...item, value: action.result.value } )
					: item )
			};

		case CustomizationActionTypes.editCancelled:
			return {
				...state,
				editing: false
			};

		default:
			return state;
	}
}

import { CustomizationState } from './customization.state';
import { CustomizationActionTypes, CustomizationAction } from './customization.actions';

const initialState: CustomizationState = {
	processing: false,
	modifying: false
}

export function CustomizationReducer ( state = initialState, action: CustomizationAction.All ): CustomizationState
{
	switch ( action.type ) {

		case CustomizationActionTypes.modify:
			return {
				...state,
				modifying: true
			};

		case CustomizationActionTypes.modified:
			return {
				...state,
				modifying: false
			};

		case CustomizationActionTypes.modifyFailed:
			return {
				...state,
				modifying: false
			};

		default:
			return state;
	}
}

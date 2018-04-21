import { SettingsState } from './settings.state';
import { SettingsActionTypes, SettingsAction } from './settings.actions';

const initialState: SettingsState = {
	processing: false,
	modifying: false
}

export function SettingsReducer ( state = initialState, action: SettingsAction.All ): SettingsState
{
	switch ( action.type ) {

		case SettingsActionTypes.modify:
			return {
				...state,
				modifying: true
			};

		case SettingsActionTypes.modified:
			return {
				...state,
				modifying: false
			};

		case SettingsActionTypes.modifyFailed:
			return {
				...state,
				modifying: false
			};

		default:
			return state;
	}
}

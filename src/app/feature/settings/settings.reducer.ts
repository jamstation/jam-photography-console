import { SettingsState } from './settings.state';
import { SettingsActionTypes, SettingsAction } from './settings.actions';

const initialState: SettingsState = {
	processing: false
}

export function SettingsReducer ( state = initialState, action: SettingsAction.All ): SettingsState
{
	switch ( action.type ) {


		default:
			return state;
	}
}

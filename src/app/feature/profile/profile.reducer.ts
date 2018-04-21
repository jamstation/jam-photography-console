import { ProfileState } from './profile.state';
import { ProfileActionTypes, ProfileAction } from './profile.actions';

const initialState: ProfileState = {
	processing: false,
	editing: false,
	formItem: null
}

export function ProfileReducer ( state = initialState, action: ProfileAction.All ): ProfileState
{
	switch ( action.type ) {

		case ProfileActionTypes.edit:
			return { ...state, editing: true, formItem: JSON.parse( JSON.stringify( action.item ) ) }

		case ProfileActionTypes.cancelEdit:
			return { ...state, editing: false }

		case ProfileActionTypes.modified:
			return { ...state, editing: false }

		default:
			return state;
	}
}

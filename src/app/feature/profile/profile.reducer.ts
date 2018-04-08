import { ProfileState } from './profile.state';
import { ProfileActionTypes, ProfileAction } from './profile.actions';

const initialState: ProfileState = {
	processing: false
}

export function ProfileReducer ( state = initialState, action: ProfileAction.All ): ProfileState
{
	switch ( action.type ) {

		default:
			return state;
	}
}

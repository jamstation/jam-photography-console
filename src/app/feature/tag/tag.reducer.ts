import { TagState } from './tag.state';
import { TagActionTypes, TagAction } from './tag.actions';
import { map, tap } from 'rxjs/operators';
import { uniqueList } from '../../../jam/function-library';

const initialState: TagState = {
	list: [],
	processing: false,
	loading: false,
	creating: false,
	editing: false,
	formItem: null,
	lastModifiedItem: null
}

export function TagReducer ( state = initialState, action: TagAction.All ): TagState
{
	switch ( action.type ) {

		case TagActionTypes.load:
			return {
				...state,
				processing: true,
				loading: true
			};

		case TagActionTypes.loaded:
			return {
				...state,
				processing: false,
				loading: false,
				list: action.list
			};

		case TagActionTypes.create:
			return {
				...state,
				creating: true,
				formItem: { name: null }
			};

		case TagActionTypes.cancelCreate:
			return {
				...state,
				creating: false
			};

		case TagActionTypes.edit:
			return {
				...state,
				editing: true,
				formItem: JSON.parse( JSON.stringify( action.item ) )
			};

		case TagActionTypes.cancelEdit:
			return {
				...state,
				editing: false
			};

		case TagActionTypes.added:
			return {
				...state,
				creating: false,
				lastModifiedItem: action.item
			};

		case TagActionTypes.modified:
			return {
				...state,
				editing: false,
				lastModifiedItem: action.item
			};

		default:
			return state;
	}
}

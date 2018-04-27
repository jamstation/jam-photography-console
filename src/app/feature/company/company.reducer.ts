import { CompanyState } from './company.state';
import { CompanyActionTypes, CompanyAction } from './company.actions';

const initialState: CompanyState = {
	selectedItem: null
}

export function CompanyReducer ( state = initialState, action: CompanyAction.All ): CompanyState
{
	switch ( action.type ) {

		case CompanyActionTypes.select:
			return { ...state, selectedItem: action.key }

		default:
			return state;
	}
}

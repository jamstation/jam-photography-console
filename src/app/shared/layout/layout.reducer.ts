import { LayoutState } from './layout.state';
import { LayoutActionTypes, LayoutAction } from './layout.actions';
import { ScreenSizes } from '../../../jam/model-library';

const initialState: LayoutState = {
	processing: false,
	screenSize: ScreenSizes.extraLarge,
	list: [],
	navList: [],
	selectedNavItem: null,
	sidebarToggled: false
}

export function LayoutReducer ( state = initialState, action: LayoutAction.All ): LayoutState
{
	switch ( action.type ) {

		case LayoutActionTypes.initialize:
			return {
				...state,
				processing: true
			};

		case LayoutActionTypes.initialized:
			return {
				...state,
				processing: false,
				list: action.list
			};

		case LayoutActionTypes.loadNavListSuccess:
			return {
				...state,
				navList: action.navList
			};

		case LayoutActionTypes.selectNavItem:
			return {
				...state,
				selectedNavItem: action.navItem || state.navList[ 0 ] || null
			};

		case LayoutActionTypes.toggleSidebar:
			return {
				...state,
				sidebarToggled: !state.sidebarToggled
			};

		case LayoutActionTypes.screenSizeChanged:
			return {
				...state,
				screenSize: action.screenSize
			};

		default:
			return state;
	}
}

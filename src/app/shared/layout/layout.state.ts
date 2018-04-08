import { NavItem, LayoutItem, ScreenSizes } from './../../../jam/model-library';

export interface LayoutState
{
	processing: boolean;
	list: LayoutItem[];
	navList: NavItem[];
	selectedNavItem: NavItem;
	sidebarToggled: boolean;
	screenSize: ScreenSizes;
}

import { NavItem, LayoutItem, ScreenSizes } from './../../../jam/model-library';
import { CoreModuleState } from '../../core/core.store';

export interface LayoutModuleState extends CoreModuleState
{
	layoutState: LayoutState;
}

export interface LayoutState
{
	initialized: boolean;
	processing: boolean;
	list: LayoutItem[];
	screenSize: ScreenSizes;
}

import { NavItem, LayoutItem, ScreenSizes } from './../../../jam/model-library';
import { AppModuleState } from '../../app.store';

export interface LayoutModuleState extends AppModuleState
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

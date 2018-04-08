import { Action } from '@ngrx/store';
import { NavItem, LayoutItem, ScreenSizes } from './../../../jam/model-library';

export const enum LayoutActionTypes
{
	initialize = '[Layout] initialize',
	initialized = '[Layout] initializeed',
	loadNavListSuccess = '[Layout] load nav list success',
	selectNavItem = '[Layout] select nav item',
	toggleSidebar = '[Layout] toggle sidebar',
	screenSizeChanged = '[Layout] screen size changed'
}

export namespace LayoutAction
{
	export class Initialize implements Action
	{
		public readonly type = LayoutActionTypes.initialize;
		constructor () { }
	}

	export class Initialized implements Action
	{
		public readonly type = LayoutActionTypes.initialized;
		constructor ( public list: LayoutItem[] ) { }
	}

	export class LoadNavListSuccess implements Action
	{
		public readonly type = LayoutActionTypes.loadNavListSuccess;
		constructor ( public navList: NavItem[] ) { }
	}

	export class SelectNavItem implements Action
	{
		public readonly type = LayoutActionTypes.selectNavItem;
		constructor ( public navItem: NavItem ) { }
	}

	export class ToggleSidebar implements Action
	{
		public readonly type = LayoutActionTypes.toggleSidebar;
		constructor () { }
	}

	export class ScreenSizeChanged implements Action
	{
		public readonly type = LayoutActionTypes.screenSizeChanged;
		constructor ( public screenSize: ScreenSizes ) { }
	}

	export type All
		= Initialize
		| Initialized
		| LoadNavListSuccess
		| SelectNavItem
		| ToggleSidebar
		| ScreenSizeChanged
		;
}

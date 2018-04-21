import { Action } from '@ngrx/store';
import { NavItem, LayoutItem, ScreenSizes } from './../../../jam/model-library';

export const enum LayoutActionTypes
{
	initialize = '[Layout] initialize',
	initialized = '[Layout] initialized',
	load = '[Layout] load',
	loaded = '[Layout] loaded',
	loadFailed = '[Layout] loadFailed',
	screenSizeChanged = '[Layout] screenSizeChanged',
	selectNavItem = '[Layout] selectNavItem'
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

	export class Load implements Action
	{
		public readonly type = LayoutActionTypes.load;
		constructor ( public category: string ) { }
	}

	export class Loaded implements Action
	{
		public readonly type = LayoutActionTypes.loaded;
		constructor ( public newList: LayoutItem[], public category: string ) { }
	}

	export class LoadFailed implements Action
	{
		public readonly type = LayoutActionTypes.loadFailed;
		constructor () { }
	}

	export class ScreenSizeChanged implements Action
	{
		public readonly type = LayoutActionTypes.screenSizeChanged;
		constructor ( public screenSize: ScreenSizes ) { }
	}

	export class SelectNavItem implements Action
	{
		public readonly type = LayoutActionTypes.selectNavItem;
		constructor ( public navItem: NavItem ) { }
	}

	export type All
		= Initialize
		| Initialized
		| Load
		| Loaded
		| LoadFailed
		| ScreenSizeChanged
		| SelectNavItem
		;
}

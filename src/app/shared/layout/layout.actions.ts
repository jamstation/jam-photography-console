import { Action } from '@ngrx/store';
import { NavItem, LayoutItem, ScreenSizes } from './../../../jam/model-library';

export const enum LayoutActionTypes
{
	load = '[Layout] load',
	loaded = '[Layout] loaded',
	loadFailed = '[Layout] loadFailed',
	selectNavItem = '[Layout] selectNavItem'
}

export namespace LayoutAction
{

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

	export class SelectNavItem implements Action
	{
		public readonly type = LayoutActionTypes.selectNavItem;
		constructor ( public navItem: NavItem ) { }
	}

	export type All
		= Load
		| Loaded
		| LoadFailed
		| SelectNavItem
		;
}

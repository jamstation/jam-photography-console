import { Action } from '@ngrx/store';
import { KeyValue } from '../../../jam/model-library';

export const enum DashboardActionTypes
{
	load = '[Dashboard] load',
	loaded = '[Dashboard] loaded',
	loadFailed = '[Dashboard] loadFailed'
}

export namespace DashboardAction
{

	export class Load implements Action
	{
		public readonly type = DashboardActionTypes.load;
		constructor () { }
	}

	export class Loaded implements Action
	{
		public readonly type = DashboardActionTypes.loaded;
		constructor ( public list: KeyValue<number>[] ) { }
	}

	export class LoadFailed implements Action
	{
		public readonly type = DashboardActionTypes.loadFailed;
		constructor () { }
	}

	export type All
		= Load
		| Loaded
		| LoadFailed
		;
}

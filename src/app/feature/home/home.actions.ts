import { Action } from '@ngrx/store';
import { UserCompany } from '../../../jam/model-library';

export const enum HomeActionTypes
{
	load = '[Home] load',
	loaded = '[Home] loaded',
	loadFailed = '[Home] loadFailed',
	select = '[Home] select'
}

export namespace HomeAction
{

	export class Load implements Action
	{
		public readonly type = HomeActionTypes.load;
		constructor () { }
	}

	export class Loaded implements Action
	{
		public readonly type = HomeActionTypes.loaded;
		constructor ( public list: UserCompany[] ) { }
	}

	export class LoadFailed implements Action
	{
		public readonly type = HomeActionTypes.loadFailed;
		constructor () { }
	}

	export class Select implements Action
	{
		public readonly type = HomeActionTypes.select;
		constructor ( public item: UserCompany ) { }
	}

	export type All
		= Load
		| Loaded
		| LoadFailed
		| Select
		;
}

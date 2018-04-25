import { Action } from '@ngrx/store';
import { Company } from '../../shared/model';

export const enum ConsoleActionTypes
{
	load = '[Console] load',
	loaded = '[Console] loaded',
	loadFailed = '[Console] loadFailed'
}

export namespace ConsoleAction
{

	export class Load implements Action
	{
		public readonly type = ConsoleActionTypes.load;
		constructor () { }
	}

	export class Loaded implements Action
	{
		public readonly type = ConsoleActionTypes.loaded;
		constructor ( public list: Company[] ) { }
	}

	export class LoadFailed implements Action
	{
		public readonly type = ConsoleActionTypes.loadFailed;
		constructor () { }
	}

	export type All
		= Load
		| Loaded
		| LoadFailed
		;
}

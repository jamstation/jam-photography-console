import { Action } from '@ngrx/store';
import { UserCompany } from '../../../jam/model-library';
import { Company } from '../../shared/model';

export const enum HomeActionTypes
{
	load = '[Home] load',
	loaded = '[Home] loaded',
	loadFailed = '[Home] loadFailed',
	select = '[Home] select',
	create = '[Home] create',
	cancelCreate = '[Home] cancelCreate',
	add = '[Home] add',
	added = '[Home] added',
	addFailed = '[Home] addFailed'
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

	export class Create implements Action
	{
		public readonly type = HomeActionTypes.create;
		constructor () { }
	}

	export class CancelCreate implements Action
	{
		public readonly type = HomeActionTypes.cancelCreate;
		constructor () { }
	}

	export class Add implements Action
	{
		public readonly type = HomeActionTypes.add;
		constructor ( public item: Company ) { }
	}

	export class Added implements Action
	{
		public readonly type = HomeActionTypes.added;
		constructor ( public item: UserCompany ) { }
	}

	export class AddFailed implements Action
	{
		public readonly type = HomeActionTypes.addFailed;
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
		| Create
		| CancelCreate
		| Add
		| Added
		| AddFailed
		;
}

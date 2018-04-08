import { Action } from '@ngrx/store';
import { LayoutItem, KeyValue } from '../../../jam/model-library';

export const enum ProfileActionTypes
{
	modify = '[Profile] modify',
	modified = '[Profile] modified',
	modifyFailed = '[Profile] modify failed'
}

export namespace ProfileAction
{

	export class Modify implements Action
	{
		public readonly type = ProfileActionTypes.modify;
		constructor ( public item: LayoutItem ) { }
	}

	export class Modified implements Action
	{
		public readonly type = ProfileActionTypes.modified;
		constructor ( public result: KeyValue ) { }
	}

	export class ModifyFailed implements Action
	{
		public readonly type = ProfileActionTypes.modifyFailed;
		constructor () { }
	}

	export type All
		= Modify
		| Modified
		| ModifyFailed
		;
}

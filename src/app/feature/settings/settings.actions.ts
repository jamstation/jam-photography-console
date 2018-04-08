import { Action } from '@ngrx/store';
import { KeyValue, LayoutItem } from '../../../jam/model-library';

export const enum SettingsActionTypes
{
	modify = '[Settings] modify',
	modified = '[Settings] modified',
	modifyFailed = '[Settings] modify failed'
}

export namespace SettingsAction
{

	export class Modify implements Action
	{
		public readonly type = SettingsActionTypes.modify;
		constructor ( public item: LayoutItem ) { }
	}

	export class Modified implements Action
	{
		public readonly type = SettingsActionTypes.modified;
		constructor ( public result: KeyValue ) { }
	}

	export class ModifyFailed implements Action
	{
		public readonly type = SettingsActionTypes.modifyFailed;
		constructor () { }
	}

	export type All
		= Modify
		| Modified
		| ModifyFailed
		;
}

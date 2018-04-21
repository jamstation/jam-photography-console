import { Action } from '@ngrx/store';
import { KeyValue } from '../../../jam/model-library';

export const enum CustomizationActionTypes
{
	modify = '[Customization] modify',
	modified = '[Customization] modified',
	modifyFailed = '[Customization] modifyFailed',
}

export namespace CustomizationAction
{

	export class Modify implements Action
	{
		public readonly type = CustomizationActionTypes.modify;
		constructor ( public item: KeyValue ) { }
	}

	export class Modified implements Action
	{
		public readonly type = CustomizationActionTypes.modified;
		constructor ( public item: KeyValue ) { }
	}

	export class ModifyFailed implements Action
	{
		public readonly type = CustomizationActionTypes.modifyFailed;
		constructor () { }
	}

	export type All
		= Modify
		| Modified
		| ModifyFailed
		;
}

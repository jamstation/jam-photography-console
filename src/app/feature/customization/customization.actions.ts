import { Action } from '@ngrx/store';
import { Metadata, KeyValue } from '../../../jam/model-library';

export const enum CustomizationActionTypes
{
	load = '[Customization] load',
	loaded = '[Customization] loaded',
	select = '[Customization] select',
	edit = '[Customization] edit',
	edited = '[Customization] edited',
	editCancelled = '[Customization] edit cancelled'
}

export namespace CustomizationAction
{
	export class Load implements Action
	{
		public readonly type = CustomizationActionTypes.load;
		constructor () { }
	}

	export class Loaded implements Action
	{
		public readonly type = CustomizationActionTypes.loaded;
		constructor ( public list: Metadata[] ) { }
	}

	export class Select implements Action
	{
		public readonly type = CustomizationActionTypes.select;
		constructor ( public key: string ) { }
	}

	export class Edit implements Action
	{
		public readonly type = CustomizationActionTypes.edit;
		constructor ( public setting: Metadata ) { }
	}

	export class Edited implements Action
	{
		public readonly type = CustomizationActionTypes.edited;
		constructor ( public result: KeyValue ) { }
	}

	export class EditCancelled implements Action
	{
		public readonly type = CustomizationActionTypes.editCancelled;
		constructor () { }
	}

	export type All
		= Load
		| Loaded
		| Select
		| Edit
		| Edited
		| EditCancelled
		;
}

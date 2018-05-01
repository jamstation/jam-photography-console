import { Action } from '@ngrx/store';
import { KeyValue } from '../../../jam/model-library';

export const enum SettingsActionTypes
{
	modify = '[Settings] modify',
	modified = '[Settings] modified',
	modifyFailed = '[Settings] modify failed',
	shutdownCompany = '[Settings] shutdownCompany',
	shutdownCompanySuccess = '[Settings] shutdownCompanySuccess',
	shutdownCompanyFailed = '[Settings] shutdownCompanyFailed',
	shutdownCompanyCancelled = '[Settings] shutdownCompanyCancelled'
}

export namespace SettingsAction
{

	export class Modify implements Action
	{
		public readonly type = SettingsActionTypes.modify;
		constructor ( public item: KeyValue ) { }
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

	export class ShutdownCompany implements Action
	{
		public readonly type = SettingsActionTypes.shutdownCompany;
		constructor () { }
	}

	export class ShutdownCompanySuccess implements Action
	{
		public readonly type = SettingsActionTypes.shutdownCompanySuccess;
		constructor () { }
	}

	export class ShutdownCompanyFailed implements Action
	{
		public readonly type = SettingsActionTypes.shutdownCompanyFailed;
		constructor () { }
	}

	export class ShutdownCompanyCancelled implements Action
	{
		public readonly type = SettingsActionTypes.shutdownCompanyCancelled;
		constructor () { }
	}

	export type All
		= Modify
		| Modified
		| ModifyFailed
		| ShutdownCompany
		| ShutdownCompanySuccess
		| ShutdownCompanyFailed
		| ShutdownCompanyCancelled
		;
}

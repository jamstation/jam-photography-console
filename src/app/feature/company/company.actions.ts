import { Action } from '@ngrx/store';
import { Company } from '../../shared/model';

export const enum CompanyActionTypes
{
	select = '[Company] select'
}

export namespace CompanyAction
{

	export class Select implements Action
	{
		public readonly type = CompanyActionTypes.select;
		constructor ( public key: string ) { }
	}

	export type All
		= Select
		;
}

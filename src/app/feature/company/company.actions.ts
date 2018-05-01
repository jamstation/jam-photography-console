import { Action } from '@ngrx/store';
import { Company } from '../../shared/model';

export const enum CompanyActionTypes
{
	select = '[Company] select',
	selected = '[Company] selected'
}

export namespace CompanyAction
{

	export class Select implements Action
	{
		public readonly type = CompanyActionTypes.select;
		constructor ( public key: string ) { }
	}

	export class Selected implements Action
	{
		public readonly type = CompanyActionTypes.selected;
		constructor ( public item: Company ) { }
	}

	export type All
		= Select
		| Selected
		;
}

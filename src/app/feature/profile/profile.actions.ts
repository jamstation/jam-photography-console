import { Action } from '@ngrx/store';
import { LayoutItem, KeyValue } from '../../../jam/model-library';
import { Photo } from '../../shared/model';
import { User } from '../../../jam/auth';

export const enum ProfileActionTypes
{
	edit = '[Profile] edit',
	cancelEdit = '[Profile] cancelEdit',
	upload = '[Profile] upload',
	uploadStarted = '[Profile] uploadStarted',
	uploaded = '[Profile] uploaded',
	uploadFailed = '[Profile] uploadFailed',
	modify = '[Profile] modify',
	modified = '[Profile] modified',
	modifyFailed = '[Profile] modify failed'
}

export namespace ProfileAction
{

	export class Edit implements Action
	{
		public readonly type = ProfileActionTypes.edit;
		constructor ( public item: User ) { }
	}

	export class CancelEdit implements Action
	{
		public readonly type = ProfileActionTypes.cancelEdit;
		constructor () { }
	}

	export class Upload implements Action
	{
		public readonly type = ProfileActionTypes.upload;
		constructor ( public file: File ) { }
	}

	export class UploadStarted implements Action
	{
		public readonly type = ProfileActionTypes.uploadStarted;
		constructor ( public photo: Photo ) { }
	}

	export class Uploaded implements Action
	{
		public readonly type = ProfileActionTypes.uploaded;
		constructor () { }
	}

	export class UploadFailed implements Action
	{
		public readonly type = ProfileActionTypes.uploadFailed;
		constructor () { }
	}

	export class Modify implements Action
	{
		public readonly type = ProfileActionTypes.modify;
		constructor ( public user: Partial<User> ) { }
	}

	export class Modified implements Action
	{
		public readonly type = ProfileActionTypes.modified;
		constructor ( public user: User ) { }
	}

	export class ModifyFailed implements Action
	{
		public readonly type = ProfileActionTypes.modifyFailed;
		constructor () { }
	}

	export type All
		= Edit
		| CancelEdit
		| Upload
		| UploadStarted
		| Uploaded
		| UploadFailed
		| Modify
		| Modified
		| ModifyFailed
		;
}

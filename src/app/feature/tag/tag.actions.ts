import { Action } from '@ngrx/store';
import { Tag } from '../../shared/model';
import { UploadableFile } from '../../../jam/model-library';
import { JamFirestoreBatchUploadTask } from '../../../jam/firestore-storage';

export const enum TagActionTypes
{
	load = '[Tag] load',
	loaded = '[Tag] loaded',
	create = '[Tag] create',
	cancelCreate = '[Tag] cancelCreate',
	edit = '[Tag] edit',
	cancelEdit = '[Tag] cancelEdit',
	add = '[Tag] add',
	added = '[Tag] added',
	addFailed = '[Tag] addFailed',
	modify = '[Tag] modify',
	modified = '[Tag] modified',
	modifyFailed = '[Tag] modifyFailed',
	remove = '[Tag] remove',
	removed = '[Tag] removed',
	removeFailed = '[Tag] removeFailed'
}

export namespace TagAction
{
	export class Load implements Action
	{
		public readonly type = TagActionTypes.load;
		constructor () { }
	}

	export class Loaded implements Action
	{
		public readonly type = TagActionTypes.loaded;
		constructor ( public list: Tag[] ) { }
	}

	export class Create implements Action
	{
		public readonly type = TagActionTypes.create;
		constructor () { }
	}

	export class CancelCreate implements Action
	{
		public readonly type = TagActionTypes.cancelCreate;
		constructor () { }
	}

	export class Edit implements Action
	{
		public readonly type = TagActionTypes.edit;
		constructor ( public item: Tag ) { }
	}

	export class CancelEdit implements Action
	{
		public readonly type = TagActionTypes.cancelEdit;
		constructor () { }
	}

	export class Add implements Action
	{
		public readonly type = TagActionTypes.add;
		constructor ( public item: Tag ) { }
	}

	export class Added implements Action
	{
		public readonly type = TagActionTypes.added;
		constructor ( public item: Tag ) { }
	}

	export class AddFailed implements Action
	{
		public readonly type = TagActionTypes.addFailed;
		constructor () { }
	}

	export class Modify implements Action
	{
		public readonly type = TagActionTypes.modify;
		constructor ( public item: Tag ) { }
	}

	export class Modified implements Action
	{
		public readonly type = TagActionTypes.modified;
		constructor ( public item: Tag ) { }
	}

	export class ModifyFailed implements Action
	{
		public readonly type = TagActionTypes.modifyFailed;
		constructor () { }
	}

	export class Remove implements Action
	{
		public readonly type = TagActionTypes.remove;
		constructor ( public item: Tag ) { }
	}

	export class Removed implements Action
	{
		public readonly type = TagActionTypes.removed;
		constructor ( public item: Tag ) { }
	}

	export class RemoveFailed implements Action
	{
		public readonly type = TagActionTypes.removeFailed;
		constructor () { }
	}

	export type All
		= Load
		| Loaded
		| Create
		| CancelCreate
		| Edit
		| CancelEdit
		| Add
		| Added
		| AddFailed
		| Modify
		| Modified
		| ModifyFailed
		| Remove
		| Removed
		| RemoveFailed
		;
}

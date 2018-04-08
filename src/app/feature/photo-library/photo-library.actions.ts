import { Action } from '@ngrx/store';
import { Photo } from '../../shared/model';
import { UploadableFile } from '../../../jam/model-library';
import { JamFirestoreBatchUploadTask } from '../../../jam/firestore-storage';

export const enum PhotoLibraryActionTypes
{
	load = '[PhotoLibrary] load',
	loaded = '[PhotoLibrary] loaded',
	select = '[PhotoLibrary] select',
	unSelectAll = '[PhotoLibrary] unSelectAll',
	edit = '[PhotoLibrary] edit',
	edited = '[PhotoLibrary] edited',
	editCancelled = '[PhotoLibrary] editCancelled',
	addPhotos = '[PhotoLibrary] addPhotos',
	generateThumbnails = '[PhotoLibrary] generateThumbnails',
	upload = '[PhotoLibrary] upload',
	uploadStarted = '[PhotoLibrary] uploadStarted',
	uploaded = '[PhotoLibrary] uploaded',
	uploadFailed = '[PhotoLibrary] uploadFailed',
	pauseUpload = '[PhotoLibrary] pauseUpload',
	cancelUpload = '[PhotoLibrary] cancelUpload',
	add = '[PhotoLibrary] add',
	added = '[PhotoLibrary] added',
	addFailed = '[PhotoLibrary] addFailed',
	modify = '[PhotoLibrary] modify',
	modified = '[PhotoLibrary] modified',
	modifyFailed = '[PhotoLibrary] modifyFailed',
	remove = '[PhotoLibrary] remove',
	removed = '[PhotoLibrary] removed',
	removeFailed = '[PhotoLibrary] removeFailed'
}

export namespace PhotoLibraryAction
{
	export class Load implements Action
	{
		public readonly type = PhotoLibraryActionTypes.load;
		constructor () { }
	}

	export class Loaded implements Action
	{
		public readonly type = PhotoLibraryActionTypes.loaded;
		constructor ( public list: Photo[] ) { }
	}

	export class Select implements Action
	{
		public readonly type = PhotoLibraryActionTypes.select;
		constructor ( public item: Photo ) { }
	}

	export class UnSelectAll implements Action
	{
		public readonly type = PhotoLibraryActionTypes.unSelectAll;
		constructor () { }
	}

	export class Edit implements Action
	{
		public readonly type = PhotoLibraryActionTypes.edit;
		constructor ( public item: Photo ) { }
	}

	export class Edited implements Action
	{
		public readonly type = PhotoLibraryActionTypes.edited;
		constructor () { }
	}

	export class EditCancelled implements Action
	{
		public readonly type = PhotoLibraryActionTypes.editCancelled;
		constructor () { }
	}

	export class AddPhotos implements Action
	{
		public readonly type = PhotoLibraryActionTypes.addPhotos;
		constructor ( public fileList: FileList ) { }
	}

	export class GenerateThumbnails implements Action
	{
		public readonly type = PhotoLibraryActionTypes.generateThumbnails;
		constructor ( public list: Photo[] ) { }
	}

	export class Upload implements Action
	{
		public readonly type = PhotoLibraryActionTypes.upload;
		constructor ( public list: Photo[] ) { }
	}

	export class UploadStarted implements Action
	{
		public readonly type = PhotoLibraryActionTypes.uploadStarted;
		constructor ( public list: Photo[] ) { }
	}

	export class Uploaded implements Action
	{
		public readonly type = PhotoLibraryActionTypes.uploaded;
		constructor () { }
	}

	export class UploadFailed implements Action
	{
		public readonly type = PhotoLibraryActionTypes.uploadFailed;
		constructor () { }
	}

	export class PauseUpload implements Action
	{
		public readonly type = PhotoLibraryActionTypes.pauseUpload;
		constructor ( public item: Photo ) { }
	}

	export class CancelUpload implements Action
	{
		public readonly type = PhotoLibraryActionTypes.cancelUpload;
		constructor ( public item: Photo ) { }
	}

	export class Add implements Action
	{
		public readonly type = PhotoLibraryActionTypes.add;
		constructor ( public item: Photo ) { }
	}

	export class Added implements Action
	{
		public readonly type = PhotoLibraryActionTypes.added;
		constructor ( public item: Photo ) { }
	}

	export class AddFailed implements Action
	{
		public readonly type = PhotoLibraryActionTypes.addFailed;
		constructor () { }
	}

	export class Modify implements Action
	{
		public readonly type = PhotoLibraryActionTypes.modify;
		constructor ( public list: Photo[] ) { }
	}

	export class Modified implements Action
	{
		public readonly type = PhotoLibraryActionTypes.modified;
		constructor () { }
	}

	export class ModifyFailed implements Action
	{
		public readonly type = PhotoLibraryActionTypes.modifyFailed;
		constructor () { }
	}

	export class Remove implements Action
	{
		public readonly type = PhotoLibraryActionTypes.remove;
		constructor () { }
	}

	export class Removed implements Action
	{
		public readonly type = PhotoLibraryActionTypes.removed;
		constructor ( public item: Photo ) { }
	}

	export class RemoveFailed implements Action
	{
		public readonly type = PhotoLibraryActionTypes.removeFailed;
		constructor () { }
	}

	export type All
		= Load
		| Loaded
		| Select
		| UnSelectAll
		| Edit
		| Edited
		| EditCancelled
		| AddPhotos
		| GenerateThumbnails
		| Upload
		| UploadStarted
		| Uploaded
		| UploadFailed
		| PauseUpload
		| CancelUpload
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

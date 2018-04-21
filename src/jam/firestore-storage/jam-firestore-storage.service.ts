import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, merge, withLatestFrom, filter, skip, toArray, tap, concat } from "rxjs/operators";
import { AngularFireStorage, AngularFireUploadTask, AngularFireStorageReference } from 'angularfire2/storage';
import { UploadableFile, UploadStatuses } from "../../jam/model-library";
import { average, mergeObservables } from "../../jam/function-library";
import { JamFirestoreBatchUploadTask } from "./jam-firestore-batch-upload-task.model";
import { JamFirestoreUploadTask } from "./jam-firestore-upload-task.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { UploadMetadata } from "@firebase/storage-types";
import { JamFirestoreUploadFile } from "./jam-firestore-upload-file.model";

@Injectable()
export class JamFirestoreStorage
{

	constructor ( public afStorage: AngularFireStorage ) { }


	public ref ( path: string ): AngularFireStorageReference
	{
		return this.afStorage.ref( path );
	}

	public uploadMany ( ...files: JamFirestoreUploadFile[] ): JamFirestoreUploadTask[]
	{
		return files.map( file => this.upload( file.path, file.data, file.metadata ) );
	}

	public upload ( path: string, data: any, metadata?: UploadMetadata ): JamFirestoreUploadTask
	{
		let task: JamFirestoreUploadTask = this.afStorage.upload( path, data, metadata );
		task = {
			...task,
			status: new BehaviorSubject( UploadStatuses.uploading ),
			error: new BehaviorSubject( null )
		}

		task.then(
			// OnFulfilled
			taskSnapshot =>
			{
				task.status.next( UploadStatuses.completed );
				task.status.complete();
			},
			// OnRejected
			error =>
			{
				task.status.next( UploadStatuses.errored );
				task.error.next( error );
			}
		)

		return task;
	}

	public pause ( uploadTask: JamFirestoreUploadTask ): boolean
	{
		const paused = uploadTask.pause();
		if ( paused ) {
			uploadTask.status.next( UploadStatuses.paused );
		}
		return paused;
	}

	public resume ( uploadTask: JamFirestoreUploadTask ): boolean
	{
		const resumed = uploadTask.resume();
		if ( resumed ) {
			uploadTask.status.next( UploadStatuses.uploading );
		}
		return resumed;
	}

	public cancel ( uploadTask: JamFirestoreUploadTask ): boolean
	{
		const cancelled = uploadTask.cancel();
		if ( cancelled ) uploadTask.status.next( UploadStatuses.cancelled );
		return cancelled;
	}

	public notifyOnCompletion ( uploadTasks: JamFirestoreUploadTask[] ): Observable<number>
	{
		const mergedTask = uploadTasks.map( ( task, i ) => task.status.pipe(
			filter( status => status == UploadStatuses.completed ),
			map( status => i )
		) );

		return mergeObservables( mergedTask );
		// return Observable.of( null ).pipe(
		// 	merge( ...mergedTask ),
		// 	skip( 1 )
		// );
	}

}

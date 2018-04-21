import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";
import { JamFirestoreStorage } from "../../../jam/firestore-storage";
import { UploadStatuses } from "../../../jam/model-library";
import { readImage, resizeImage } from "../../../jam/function-library";
import { PROFILE_PHOTO_FOLDER } from "../../core";
import { Photo } from "../../shared/model";

@Injectable()
export class ProfileService
{

	constructor ( private firestoreUploader: JamFirestoreStorage ) { }

	public resizePhoto ( file: File ): Observable<Photo>
	{
		const fileExtension = file.name.split( '.' ).pop();
		const cloudPath = PROFILE_PHOTO_FOLDER + 'profile_photo' + fileExtension;
		const photo: Photo = {
			name: file.name,
			cloudPath: cloudPath,
			uploadInfo$: {
				localCopy: file,
				cloudPath: cloudPath,
				status: Observable.of( UploadStatuses.notStarted )
			}
		};
		return readImage( photo.uploadInfo$.localCopy ).pipe(
			map( image => resizeImage( image, 300 ).toDataURL() ),
			map( resizedImage => ( { ...photo, thumbnail: resizedImage } ) )
		);
	}


	public upload ( photo: Photo ): Photo
	{
		const uploadTask = this.firestoreUploader.upload( photo.uploadInfo$.cloudPath, photo.uploadInfo$.localCopy );
		return {
			...photo,
			uploadInfo$: {
				...photo.uploadInfo$,
				task: uploadTask,
				status: uploadTask.status.asObservable(),
				progress: uploadTask.percentageChanges()
			}
		};
	}

}

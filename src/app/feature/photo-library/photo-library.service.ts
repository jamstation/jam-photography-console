import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { merge, skip, toArray, map, switchMap, tap } from "rxjs/operators";
import { MatGridData, ScreenSizes, UploadableFile, UploadStatuses } from "../../../jam/model-library";
import { PHOTO_UPLOAD_FOLDER } from "../../core";
import { Photo } from "../../shared/model";
import { concatObservablesToArray, readImage, resizeImage } from "../../../jam/function-library";
import { JamFirestoreStorage } from "../../../jam/firestore-storage";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class PhotoLibraryService
{

	constructor ( private firestoreUploader: JamFirestoreStorage ) { }

	public getGridData ( screenSize: ScreenSizes ): MatGridData
	{
		return [
			{ screenSize: ScreenSizes.extraLarge, cols: 9, rowHeight: '150px' },
			{ screenSize: ScreenSizes.large, cols: 7, rowHeight: '150px' },
			{ screenSize: ScreenSizes.medium, cols: 6, rowHeight: '150px' },
			{ screenSize: ScreenSizes.small, cols: 4, rowHeight: '150px' },
			{ screenSize: ScreenSizes.extraSmall, cols: 3, rowHeight: '100px' }
		].find( gridData => gridData.screenSize == screenSize );
	}

	public mapFilesToPhotos ( fileList: FileList ): Photo[]
	{
		return Array.from( fileList )
			.filter( file => file.type.split( '/' )[ 0 ] == 'image' )
			.map( file =>
			{
				const cloudPath = PHOTO_UPLOAD_FOLDER + new Date().getTime() + '_' + file.name;
				return {
					name: file.name,
					cloudPath: cloudPath,
					tagKeys: [],
					tags: [],
					live: false,
					uploadInfo$: {
						localCopy: file,
						cloudPath: cloudPath,
						status: Observable.of( UploadStatuses.notStarted )
					}
				};
			} );
	}

	public addThumbnailsToPhotos ( photos: Photo[] ): Observable<Photo[]>
	{
		const photoObservables = photos.map( photo => readImage( photo.uploadInfo$.localCopy ).pipe(
			map( image => resizeImage( image, 300 ).toDataURL() ),
			map( resizedImage => ( { ...photo, thumbnail: resizedImage } ) ),
		) );
		return concatObservablesToArray( photoObservables );
	}

	public upload ( photos: Photo[] ): Photo[]
	{
		return photos.map( photo =>
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
			}
		} );
	}

}

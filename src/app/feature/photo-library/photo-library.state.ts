import { CoreModuleState } from "../../core/core.store";
import { Photo, Tag } from "../../shared/model";
import { JamFirestoreBatchUploadTask } from "../../../jam/firestore-storage";

export interface PhotoLibraryModuleState extends CoreModuleState
{
	photoLibraryState: PhotoLibraryState
}

export interface PhotoLibraryState
{
	list: Photo[];
	tagList: Tag[];

	processing: boolean;
	editing: boolean;
	uploadTask: JamFirestoreBatchUploadTask<Photo>;
	uploadingPhotos: Photo[];
	selectedPhotos: Photo[];
}

import { KeyValue } from "../../../jam/model-library";
import { JamFirestoreBatchUploadTask } from "../../../jam/firestore-storage";
import { Photo, Tag } from "../../shared/model";
import { CoreModuleState } from "../../core/core.store";

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
	localThumbnails: KeyValue[];
}

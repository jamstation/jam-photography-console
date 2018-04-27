import { KeyValue } from "../../../jam/model-library";
import { JamFirestoreBatchUploadTask } from "../../../jam/firestore-storage";
import { Photo, Tag } from "../../shared/model";
import { AppModuleState } from "../../app.store";

export interface PhotoLibraryModuleState extends AppModuleState
{
	photoLibraryState: PhotoLibraryState
}

export interface PhotoLibraryState
{
	list: Photo[];
	tagList: Tag[];

	processing: boolean;
	editing: boolean;
	uploadingPhotos: Photo[];
	selectedPhotos: Photo[];
	localThumbnails: KeyValue[];
}

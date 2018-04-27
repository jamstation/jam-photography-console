import { AppModuleState } from "../../app.store";
import { Photo, Tag } from "../../shared/model";
import { JamFirestoreBatchUploadTask } from "../../../jam/firestore-storage";

export interface TagModuleState extends AppModuleState
{
	tagState: TagState
}

export interface TagState
{
	list: Tag[];

	processing: boolean;
	loading: boolean;
	creating: boolean;
	editing: boolean;
	formItem: Tag;

	lastModifiedItem: Tag;
}

import { Observable } from "rxjs/Observable";
import { FirestoreData, UploadInfo, UploadStatuses } from "./../../../jam/model-library";
import { Tag } from "./tag.model";

export interface Photo extends FirestoreData
{
	name?: string;
	caption?: string;
	description?: string;
	cloudPath?: string;
	url?: string;
	thumbnail?: string;
	tagKeys?: string[];
	tags?: Tag[];
	live?: boolean;

	uploadInfo$?: UploadInfo;
	selected$?: boolean;
}

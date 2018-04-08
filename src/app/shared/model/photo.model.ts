import { FirestoreData, UploadInfo } from "./../../../jam/model-library";
import { Observable } from "rxjs/Observable";
import { UploadStatuses } from "../../../jam/model-library";

export interface Photo extends FirestoreData
{
	name?: string;
	cloudPath?: string;
	url?: string;
	thumbnail?: string;
	tags?: string[];
	live?: boolean;

	uploadInfo$?: UploadInfo;
	selected$?: boolean;
}

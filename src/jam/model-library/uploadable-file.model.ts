import { Observable } from "rxjs/Observable";
import { UploadMetadata } from "@firebase/storage-types";

export interface UploadableFile<T>
{
	localCopy?: File;
	data?: T;
	name?: string;
	cloudPath?: string;
	cloudUrl?: string;
	metadata?: UploadMetadata;
}

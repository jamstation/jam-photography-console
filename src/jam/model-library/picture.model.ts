import { FirestoreData } from "./firestore-data.model";

export interface Picture extends FirestoreData
{
	name: string,
	normal: string,
	thumbnail: string,
	big: string,
	maxResolution: string
}

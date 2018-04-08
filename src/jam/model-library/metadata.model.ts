import { FirestoreData } from "./firestore-data.model";

export interface Metadata extends FirestoreData
{
	category?: string;
	name: string;
	value?: string;
	label?: string;
}

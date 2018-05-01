import { FirestoreData } from "../../../jam/model-library";

export interface Company extends FirestoreData
{
	userKey: string;
	name: string;
	id: string;
	subscription: string;
}

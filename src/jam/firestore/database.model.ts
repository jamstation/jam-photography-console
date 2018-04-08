import { FirestoreData } from "../../jam/model-library";
import { Table } from "./table.model";

export interface Database extends FirestoreData
{
	name?: string;
	path?: string;
	metadataPath: string;
	tables?: Table<FirestoreData>[];
}

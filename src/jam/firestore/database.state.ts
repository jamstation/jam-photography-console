import { FirestoreData, Error } from "../../jam/model-library";
import { Table } from "./table.model";

export interface DatabaseModuleState
{
	databaseState: DatabaseState;
}

export interface DatabaseState
{
	initialized: boolean;
	processing: boolean;
	error: Error;
	path: string;
	metadataPath: string;
	tables: Table<FirestoreData>[];
}

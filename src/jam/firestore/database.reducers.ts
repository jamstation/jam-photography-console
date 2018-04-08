import { DatabaseState } from './database.state';
import { DatabaseActionTypes, DatabaseAction } from './database.actions';
import { FirestoreData, Error } from "../../jam/model-library";
import { Table } from './table.model';
import { defaults } from './database.config';

const initialState: DatabaseState = {
	initialized: false,
	processing: false,
	error: null,
	path: '',
	metadataPath: '',
	tables: []
}

export function DatabaseReducer ( state = initialState, action: DatabaseAction.All )
{
	switch ( action.type ) {

		case DatabaseActionTypes.initialize:
			return {
				...state,
				metadataPath: action.metadataPath,
				initialized: false,
				processing: true
			};

		case DatabaseActionTypes.initialized:
			return {
				...state,
				path: action.database.path,
				metadataPath: action.database.metadataPath,
				tables: action.database.tables,
				initialized: true,
				processing: false
			};

		case DatabaseActionTypes.initializeFailed:
			return {
				...state,
				initialized: false,
				processing: false
			};

		case DatabaseActionTypes.enterCollection:
			state.tables.forEach( table => table.resolvePath( action.collectionName, action.documentKey ) );
			return {
				...state,
				tables: state.tables
			}

		default:
			return state;
	}
}

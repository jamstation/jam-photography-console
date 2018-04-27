const actionSanitizer = ( action ) =>
{
	switch ( action.type ) {
		case '[PhotoLibrary] addPhotos':
			return { ...action, fileList: [] };
		case '[PhotoLibrary] generateThumbnails':
		case '[PhotoLibrary] upload':
		case '[PhotoLibrary] uploadStarted':
			return { ...action, uploadingPhotos: [] };
		case '[Profile] upload':
			return { ...action, file: '<<LONG_BLOB>>' };
		case '[Profile] uploadStarted':
			return { ...action, photo: null };
		default:
			return action;
	}
};

const stateSanitizer = ( state ) =>
{
	let otherStates: any = {};
	if ( state.photoLibraryState ) {
		otherStates = {
			...otherStates,
			photoLibraryState: {
				...state.photoLibraryState,
				list: [],
				uploadingPhotos: [],
				selectedPhotos: []
			}
		};
	}

	return {
		...state,
		...otherStates,
		databaseState: {
			...state.databaseState,
			tables: state.databaseState.tables.map( table => ( { ...table, db: null, collection: null } ) )
		},
		authState: {
			...state.authState,
			userTable: { ...state.authState.userTable, db: null, collection: null }
		}
	}
};

export const storeDevtoolsConfig = {
	name: 'Jam Photography Console',
	maxAge: 25,
	logOnly: true,
	stateSanitizer: stateSanitizer,
	actionSanitizer: actionSanitizer
};

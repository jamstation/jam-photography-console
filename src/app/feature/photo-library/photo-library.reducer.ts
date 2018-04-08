import { PhotoLibraryState } from './photo-library.state';
import { PhotoLibraryActionTypes, PhotoLibraryAction } from './photo-library.actions';
import { map, tap } from 'rxjs/operators';
import { uniqueList } from '../../../jam/function-library';

const initialState: PhotoLibraryState = {
	list: [],
	processing: false,
	editing: false,
	uploadTask: null,
	uploadingPhotos: [],
	selectedPhotos: []
}

export function PhotoLibraryReducer ( state = initialState, action: PhotoLibraryAction.All ): PhotoLibraryState
{
	switch ( action.type ) {

		case PhotoLibraryActionTypes.load:
			return {
				...state,
				processing: true
			};

		case PhotoLibraryActionTypes.loaded:
			return {
				...state,
				processing: false,
				list: action.list
			};

		case PhotoLibraryActionTypes.select:
			return {
				...state,
				selectedPhotos: action.item.selected$
					? state.selectedPhotos.concat( action.item )
					: state.selectedPhotos.filter( selectedPhoto => selectedPhoto.cloudPath != action.item.cloudPath )
			};

		case PhotoLibraryActionTypes.unSelectAll:
			state.list.forEach( item => item.selected$ = false );
			return {
				...state,
				selectedPhotos: []
			};

		case PhotoLibraryActionTypes.edit:
			return {
				...state,
				editing: true
			};

		case PhotoLibraryActionTypes.edited:
			return {
				...state,
				editing: false
			};

		case PhotoLibraryActionTypes.editCancelled:
			return {
				...state,
				editing: false
			};

		case PhotoLibraryActionTypes.addPhotos:
			return {
				...state,
				processing: true
			};

		case PhotoLibraryActionTypes.generateThumbnails:
			return {
				...state,
				processing: true,
				uploadingPhotos: uniqueList( action.list.concat( state.uploadingPhotos ), 'cloudPath' )
			};

		case PhotoLibraryActionTypes.upload:
			return {
				...state,
				processing: true,
				uploadingPhotos: uniqueList( action.list.concat( state.uploadingPhotos ), 'cloudPath' )
			};

		case PhotoLibraryActionTypes.uploadStarted:
			return {
				...state,
				processing: true,
				uploadingPhotos: uniqueList( action.list.concat( state.uploadingPhotos ), 'cloudPath' )
			};

		case PhotoLibraryActionTypes.uploaded:
			return {
				...state,
				processing: false
			};

		case PhotoLibraryActionTypes.added:
			return {
				...state,
				uploadingPhotos: state.uploadingPhotos.filter( item => item.cloudPath != action.item.cloudPath )
			};

		case PhotoLibraryActionTypes.removed:
			return {
				...state,
				selectedPhotos: state.selectedPhotos.filter( item => item.cloudPath != action.item.cloudPath )
			};

		default:
			return state;
	}
}

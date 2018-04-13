import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import
{
	MatIconModule,
	MatButtonModule,
	MatGridListModule,
	MatSelectModule,
	MatCheckboxModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatDialogModule,
	MatInputModule,
	MatSlideToggleModule,
	MatChipsModule,
	MatAutocompleteModule,
	MatMenuModule
} from '@angular/material';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { JamWindowModule } from '../../../jam/ui-library';
import { SafePipeModule } from '../../../jam/pipe-library/safe.pipe';
import { JamFirestoreStorageModule } from '../../../jam/firestore-storage';

import { routes } from './photo-library.routes';
import { PhotoLibraryReducer } from './photo-library.reducer';
import { PhotoLibraryEffects } from './photo-library.effects';
import { PhotoLibraryService } from './photo-library.service';
import { PhotoLibraryComponent } from './photo-library.component';
import { PhotoEditFormComponent } from './photo-edit-form.component';

@NgModule( {
	declarations: [ PhotoLibraryComponent, PhotoEditFormComponent ],
	imports: [
		CommonModule,
		AngularFireStorageModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatSelectModule,
		MatSlideToggleModule,
		MatChipsModule,
		MatGridListModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatCheckboxModule,
		MatAutocompleteModule,
		MatMenuModule,
		MatDialogModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'photoLibraryState', PhotoLibraryReducer ),
		EffectsModule.forFeature( [ PhotoLibraryEffects ] ),
		JamWindowModule,
		SafePipeModule,
		JamFirestoreStorageModule
	],
	providers: [ PhotoLibraryService ],
	entryComponents: [ PhotoEditFormComponent ]
} )
export class PhotoLibraryModule { }

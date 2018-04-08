import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AngularFireStorageModule } from 'angularfire2/storage';
import
{
	MatIconModule,
	MatButtonModule,
	MatGridListModule,
	MatSelectModule,
	MatCheckboxModule,
	MatProgressBarModule,
	MatProgressSpinnerModule,
	MatDialogModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { JamWindowModule } from '../../../jam/ui-library';
import { SafePipeModule } from '../../../jam/pipe-library/safe.pipe';

import { routes } from './photo-library.routes';
import { PhotoLibraryReducer, PhotoLibraryEffects } from './photo-library.store';
import { PhotoLibraryService } from './photo-library.service';
import { PhotoLibraryComponent } from './photo-library.component';
import { JamFirestoreStorageModule } from '../../../jam/firestore-storage';

@NgModule( {
	declarations: [
		PhotoLibraryComponent
	],
	imports: [
		CommonModule,
		AngularFireStorageModule,
		MatIconModule,
		MatButtonModule,
		MatSelectModule,
		MatGridListModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatCheckboxModule,
		MatDialogModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'photoLibraryState', PhotoLibraryReducer ),
		EffectsModule.forFeature( [ PhotoLibraryEffects ] ),
		JamWindowModule,
		SafePipeModule,
		JamFirestoreStorageModule
	],
	providers: [
		PhotoLibraryService
	]
} )
export class PhotoLibraryModule { }

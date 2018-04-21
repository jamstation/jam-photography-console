import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import
{
	MatIconModule,
	MatButtonModule,
	MatInputModule,
	MatDialogModule,
} from '@angular/material';

import { JamWindowModule } from '../../../jam/ui-library';
import { JamFirestoreStorageModule } from '../../../jam/firestore-storage';
import { SafePipeModule } from '../../../jam/pipe-library';

import { routes } from './profile.routes';
import { ProfileReducer, ProfileEffects } from './profile.store';
import { ProfileService } from './profile.service';
import { ProfileComponent } from './profile.component';
import { ProfileFormComponent } from './profile-form.component';

@NgModule( {
	declarations: [
		ProfileComponent, ProfileFormComponent
	],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatDialogModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'profileState', ProfileReducer ),
		EffectsModule.forFeature( [ ProfileEffects ] ),
		JamWindowModule,
		JamFirestoreStorageModule,
		SafePipeModule
	],
	providers: [ ProfileService ],
	entryComponents: [ ProfileFormComponent ]
} )
export class ProfileModule { }

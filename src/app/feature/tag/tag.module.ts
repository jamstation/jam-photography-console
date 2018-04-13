import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import
{
	MatListModule,
	MatButtonModule,
	MatIconModule,
	MatInputModule,
	MatDialogModule
} from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { JamWindowModule } from '../../../jam/ui-library';

import { routes } from './tag.routes';
import { TagReducer } from './tag.reducer';
import { TagEffects } from './tag.effects';
import { TagComponent } from './tag.component';
import { TagFormComponent } from './tag-form.component';

@NgModule( {
	declarations: [ TagComponent, TagFormComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatDialogModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'tagState', TagReducer ),
		EffectsModule.forFeature( [ TagEffects ] ),
		JamWindowModule
	],
	entryComponents: [ TagFormComponent ]
} )
export class TagModule { }

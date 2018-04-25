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
	MatGridListModule
} from '@angular/material';

import { ToolbarModule } from '../../shared/layout/toolbar';

import { ConsoleGuard } from './console-guard.service';
import { ConsoleService } from './console.service';
import { routes } from './console.routes';
import { ConsoleReducer, ConsoleEffects } from './console.store';
import { ConsoleComponent } from './console.component';

@NgModule( {
	declarations: [ ConsoleComponent ],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatIconModule,
		MatButtonModule,
		MatInputModule,
		MatGridListModule,
		RouterModule.forChild( routes ),
		StoreModule.forFeature( 'consoleState', ConsoleReducer ),
		EffectsModule.forFeature( [ ConsoleEffects ] ),
		ToolbarModule
	],
	providers: [ ConsoleGuard, ConsoleService ]
} )
export class ConsoleModule { }

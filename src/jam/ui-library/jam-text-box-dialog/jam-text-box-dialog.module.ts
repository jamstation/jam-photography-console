import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { JamTextBoxDialogComponent } from './jam-text-box-dialog.component';
import { MatInputModule, MatButtonModule, MatDialogModule } from '@angular/material';

@NgModule( {
	imports: [
		ReactiveFormsModule,
		MatDialogModule,
		MatInputModule,
		MatButtonModule
	],
	declarations: [ JamTextBoxDialogComponent ],
	exports: [ JamTextBoxDialogComponent ]
} )
export class JamTextBoxDialogModule { }

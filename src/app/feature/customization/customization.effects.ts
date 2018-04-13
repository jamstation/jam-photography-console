import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from "../../core";
import { CustomizationActionTypes, CustomizationAction } from "./customization.actions";
import { MatDialog } from "@angular/material";
import { Metadata, KeyValue } from "../../../jam/model-library";
import { Validators } from "@angular/forms";

@Injectable()
export class CustomizationEffects
{

	constructor (
		private actions$: Actions,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

	}
}

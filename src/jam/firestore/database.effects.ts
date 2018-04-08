import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { map, switchMap, first, tap } from 'rxjs/operators';
import { AngularFirestore } from "angularfire2/firestore";
import { Action } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { DatabaseModuleState } from './database.state';
import { DatabaseActionTypes, DatabaseAction } from './database.actions';
import { TableBase } from "../../jam/model-library";
import { Table } from "./table.model";
import { Database } from "./database.model";

@Injectable()
export class DatabaseEffects
{
	@Effect() public initialize$: Observable<Action>;

	constructor (
		private actions$: Actions,
		private firestore: AngularFirestore
	)
	{

		this.initialize$ = this.actions$.pipe(
			ofType<DatabaseAction.Initialize>( DatabaseActionTypes.initialize ),
			switchMap( action => this.firestore
				.collection<TableBase>( action.metadataPath )
				.valueChanges().pipe(
					first(),
					map( tableBases => tableBases
						.map( table => new Table( this.firestore, table.name, table.path ) ) ),
					map( tables => tables.map( table =>
					{
						action.enterCollectionValues.forEach( collection => table.resolvePath( collection.key, collection.value ) );
						return table;
					} ) ),
					map( tables => ( { metadataPath: action.metadataPath, tables: tables } ) ) ) ),
			map( ( database: Database ) => database
				? new DatabaseAction.Initialized( database )
				: new DatabaseAction.InitializeFailed() ) );

	}
}

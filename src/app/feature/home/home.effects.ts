import { Injectable } from "@angular/core";
import { Validators } from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap, tap, withLatestFrom, filter, first, concatMap } from "rxjs/operators";
import { KeyValue, UserRoles, UserCompany } from "../../../jam/model-library";
import { DatabaseAction } from "../../../jam/firestore";
import { NotificationAction } from "../../../jam/notification";
import { DatabaseService } from '../../core';
import { HomeModuleState } from "./home.state";
import { HomeActionTypes, HomeAction } from "./home.actions";
import { Company } from "../../shared/model";
import { CompanyFormComponent } from "./company-form.component";

@Injectable()
export class HomeEffects
{
	@Effect() public load: Observable<Action>;
	@Effect() public add: Observable<Action>;
	@Effect() public added: Observable<Action>;
	@Effect() public addFailed: Observable<Action>;
	@Effect( { dispatch: false } ) public openDialog: Observable<any>;
	@Effect( { dispatch: false } ) public closeDialog: Observable<any>;

	constructor (
		private actions: Actions,
		private store: Store<HomeModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		this.load = this.actions.pipe(
			ofType<HomeAction.Load>( HomeActionTypes.load ),
			switchMap( action => this.db.tables.UserCompany.list ),
			map( list => new HomeAction.Loaded( list ) )
		);

		this.add = this.actions.pipe(
			ofType<HomeAction.Add>( HomeActionTypes.add ),
			switchMap( action => this.db.tables.Company.exists( action.item.key ).pipe(
				switchMap( companyExists => !companyExists
					? this.db.tables.Company.insert( action.item ).pipe(
						concatMap( company => company
							? this.db.tables.UserCompany.insert( { key: action.item.key, role: UserRoles.owner } )
							: Observable.of<UserCompany>( null ) ) )
					: Observable.of<UserCompany>( null ) ) ) ),
			map( item => item
				? new HomeAction.Added( item )
				: new HomeAction.AddFailed() )
		);

		this.added = this.actions.pipe(
			ofType<HomeAction.Added>( HomeActionTypes.added ),
			map( message => new NotificationAction.Open( { content: 'Company Created' } ) )
		);

		this.addFailed = this.actions.pipe(
			ofType<HomeAction.AddFailed>( HomeActionTypes.addFailed ),
			map( message => new NotificationAction.Open( { content: 'Error Creating Company' } ) )
		);

		this.openDialog = this.actions.pipe(
			ofType( HomeActionTypes.create ),
			map( action => this.dialogManager.open( CompanyFormComponent, { width: '600px', id: 'CompanyFormComponent' } ) )
		);

		this.closeDialog = this.actions.pipe(
			ofType( HomeActionTypes.cancelCreate, HomeActionTypes.added, HomeActionTypes.addFailed ),
			map( action => this.dialogManager.getDialogById( 'CompanyFormComponent' ).close() )
		);

	}
}

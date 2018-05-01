import { Injectable } from "@angular/core";
import { MatDialog } from '@angular/material';
import { Action, Store, select } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { map, switchMap, withLatestFrom, filter } from "rxjs/operators";
import { JamConfirmDialogComponent } from '../../../jam/ui-library/jam-confirm-dialog';
import { Company, Pages } from "../../shared/model";
import { DatabaseService } from "../../core";
import { SettingsActionTypes, SettingsAction } from "./settings.actions";
import { SettingsModuleState } from "./settings.state";
import { NavigatorAction } from "../../../jam/navigator";

@Injectable()
export class SettingsEffects
{

	@Effect() public modify: Observable<Action>;
	@Effect() public shutdownCompany: Observable<Action>;
	@Effect() public shutdownCompanySuccess: Observable<Action>;

	constructor (
		private actions: Actions,
		private store: Store<SettingsModuleState>,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		this.modify = this.actions.pipe(
			ofType<SettingsAction.Modify>( SettingsActionTypes.modify ),
			switchMap( action => this.db.tables.Settings.updateElseInsert( action.item ) ),
			map( item => item
				? new SettingsAction.Modified( null )
				: new SettingsAction.ModifyFailed() )
		);

		this.shutdownCompany = this.actions.pipe(
			ofType<SettingsAction.ShutdownCompany>( SettingsActionTypes.shutdownCompany ),
			map( action => ( {
				title: 'Shutdown Company',
				prompt: 'Are you sure you want to delete your company?'
			} ) ),
			switchMap( dialogData => this.dialogManager
				.open( JamConfirmDialogComponent, { data: dialogData, width: '500px' } )
				.afterClosed() ),
			filter( ( data: boolean ) => data ),
			withLatestFrom( this.store.pipe( select( state => state.companyState.selectedItem ) ) ),
			switchMap( ( [ data, company ] ) => data && this.db.tables.Company.remove( company.key ).pipe(
				switchMap( item => this.db.tables.UserCompany.remove( company.key ) ),
				map( item => item
					? new SettingsAction.ShutdownCompanySuccess()
					: new SettingsAction.ShutdownCompanyFailed() ) ) )
		);

		this.shutdownCompanySuccess = this.actions.pipe(
			ofType<SettingsAction.ShutdownCompanySuccess>( SettingsActionTypes.shutdownCompanySuccess ),
			map( action => new NavigatorAction.Navigate( Pages.home ) )
		);

	}
}

import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Observable } from "rxjs/Observable";
import { map, switchMap, tap } from "rxjs/operators";
import { Action } from "@ngrx/store";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { DatabaseService } from "../../core";
import { sortStringList } from "../../../jam/function-library";
import { TagActionTypes, TagAction } from "./tag.actions";
import { TagModuleState } from "./tag.state";
import { TagFormComponent } from "./tag-form.component";

@Injectable()
export class TagEffects
{
	@Effect() public load: Observable<Action>;
	@Effect() public add: Observable<Action>;
	@Effect() public modify: Observable<Action>;
	@Effect() public remove: Observable<Action>;
	@Effect( { dispatch: false } ) public openDialog: Observable<any>;
	@Effect( { dispatch: false } ) public closeDialog: Observable<any>;

	constructor (
		private actions: Actions,
		private db: DatabaseService,
		private dialogManager: MatDialog
	)
	{

		this.load = this.actions.pipe(
			ofType<TagAction.Load>( TagActionTypes.load ),
			switchMap( action => this.db.tables.Tag.list ),
			map( list => sortStringList( list, 'name' ) ),
			map( list => new TagAction.Loaded( list ) )
		);

		this.add = this.actions.pipe(
			ofType<TagAction.Add>( TagActionTypes.add ),
			switchMap( action => this.db.tables.Tag.insert( action.item ) ),
			map( item => item
				? new TagAction.Added( item )
				: new TagAction.AddFailed() )
		);

		this.modify = this.actions.pipe(
			ofType<TagAction.Modify>( TagActionTypes.modify ),
			switchMap( action => this.db.tables.Tag.update( action.item ) ),
			map( item => item
				? new TagAction.Modified( item )
				: new TagAction.ModifyFailed() )
		);

		this.remove = this.actions.pipe(
			ofType<TagAction.Remove>( TagActionTypes.remove ),
			switchMap( action => this.db.tables.Tag.remove( action.item.key ) ),
			map( item => item
				? new TagAction.Removed( item )
				: new TagAction.RemoveFailed() )
		);

		this.openDialog = this.actions.pipe(
			ofType<TagAction.Edit>( TagActionTypes.create, TagActionTypes.edit ),
			map( action => this.dialogManager.open( TagFormComponent, { width: '400px', id: 'TagFormComponent' } ) )
		);

		this.closeDialog = this.actions.pipe(
			ofType( TagActionTypes.cancelCreate, TagActionTypes.cancelEdit, TagActionTypes.add, TagActionTypes.modify ),
			map( action => this.dialogManager.getDialogById( 'TagFormComponent' ).close() )
		);

	}
}

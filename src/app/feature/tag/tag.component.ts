import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, tap, withLatestFrom, switchMap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { Tag } from '../../shared/model';
import { TagModuleState, TagAction } from './tag.store';
import { Subscription } from 'rxjs/Subscription';

@Component( {
	selector: 'app-tag',
	templateUrl: './tag.component.html',
	styleUrls: [ './tag.component.css' ]
} )
export class TagComponent implements OnDestroy
{

	public list: Observable<Tag[]>;
	public lastModifiedItem: Tag;
	private lastModifiedItemSubscription: Subscription;

	constructor ( private store: Store<TagModuleState> )
	{

		/**
		 * Store Selects
		 */
		this.list = this.store.pipe(
			select( state => state.tagState.list ),
			tap( list => this.lastModifiedItem = null )
		);

		this.lastModifiedItemSubscription = this.store.pipe(
			select( state => state.tagState.lastModifiedItem ),
			tap( lastModifiedItem => this.lastModifiedItem = lastModifiedItem )
		).subscribe();

		/**
		 * Store Dispatches
		 */
		this.store.dispatch( new TagAction.Load() );
	}

	ngOnDestroy (): void
	{
		this.lastModifiedItemSubscription.unsubscribe();
	}

	public create (): void
	{
		this.store.dispatch( new TagAction.Create() );
	}

	public edit ( tag: Tag ): void
	{
		this.store.dispatch( new TagAction.Edit( tag ) );
	}

	public remove ( tag: Tag ): void
	{
		this.store.dispatch( new TagAction.Remove( tag ) );
	}

}

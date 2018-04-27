import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { LayoutItem, KeyValue } from '../../../../jam/model-library';
import { splitArrayByValues, uniqueList } from '../../../../jam/function-library';
import { JamTextBoxDialogComponent } from '../../../../jam/ui-library';
import { LayoutModuleState } from '../layout.store';
import { JamTextBoxDialogData } from '../../../../jam/ui-library/jam-text-box-dialog/jam-text-box-dialog-data.model';

@Component( {
	selector: 'app-layout-setting-accordion',
	templateUrl: './setting-accordion.component.html',
	styleUrls: [ './setting-accordion.component.css' ]
} )
export class SettingAccordionComponent implements OnInit
{

	@Input() public category: string;
	@Output() public valueChange: EventEmitter<LayoutItem>;

	public list: Observable<LayoutItem[]>;
	public groups: Observable<LayoutItem[]>;
	public lists: Observable<LayoutItem[][]>;
	public selectedPanelIndex: number;

	constructor ( private store: Store<LayoutModuleState>, private dialogManager: MatDialog )
	{
		this.valueChange = new EventEmitter();
	}

	ngOnInit (): void
	{
		this.list = this.store.pipe(
			select( state => state.layoutState.list
				.filter( item => item.category == this.category )
				.map( item => ( { ...item, newValue$: item.value } ) )
				.sort( ( a, b ) => a.index - b.index ) )
		);

		this.lists = this.list.pipe(
			map( list => splitArrayByValues( list, 'groupIndex' ) ),
			filter( list => list.length > 0 )
		);

		this.groups = this.list.pipe(
			map( list => uniqueList( list, 'groupIndex' ) )
		);
	}

	public _valueChange ( layoutItem: LayoutItem, newValue?: any ): void
	{
		let item = JSON.parse( JSON.stringify( layoutItem ) );
		if ( newValue ) {
			item = { ...item, newValue$: newValue };
		}
		this.valueChange.emit( item );
	}

	public _discard ( layoutItem: LayoutItem ): void
	{
		this.selectedPanelIndex = -1;
		layoutItem.newValue$ = layoutItem.value;
	}

	public _edit ( layoutItem: LayoutItem ): void
	{
		const item: JamTextBoxDialogData = {
			key: layoutItem.key,
			value: layoutItem.value,
			label: layoutItem.label,
			placeholder: layoutItem.placeholder,
			validators: null
		};

		const dialogConfig = {
			width: '600px',
			data: item
		};

		this.dialogManager
			.open( JamTextBoxDialogComponent, dialogConfig )
			.afterClosed()
			.subscribe( ( data: KeyValue ) => data && this._valueChange( layoutItem, data.value ) );
	}

}

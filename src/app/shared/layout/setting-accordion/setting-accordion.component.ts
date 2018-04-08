import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { LayoutItem } from '../../../../jam/model-library';

@Component( {
	selector: 'app-layout-setting-accordion',
	templateUrl: './setting-accordion.component.html',
	styleUrls: [ './setting-accordion.component.css' ]
} )
export class SettingAccordionComponent
{
	@Input() public groups: Observable<LayoutItem[]>;
	@Input() public lists: Observable<LayoutItem[]>;
	@Output() public edited: EventEmitter<LayoutItem>;

	constructor ()
	{
		this.edited = new EventEmitter();
	}

	public _edited ( layoutItem: LayoutItem ): void
	{
		this.edited.emit();
	}

}

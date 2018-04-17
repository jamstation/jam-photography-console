import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map, filter } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { CustomizationAction } from './customization.actions';
import { CustomizationModuleState } from './customization.store';
import { LayoutItem } from '../../../jam/model-library';
import { uniqueList, splitArrayByValues } from '../../../jam/function-library';
import { ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Component( {
	selector: 'app-customization',
	templateUrl: './customization.component.html',
	styleUrls: [ './customization.component.css' ]
} )
export class CustomizationComponent
{

	constructor ( private store: Store<CustomizationModuleState> ) { }

}

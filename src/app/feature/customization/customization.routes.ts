import { Routes } from '@angular/router';
import { AppearanceComponent } from './appearance';
import { AboutComponent } from './about';

export const routes: Routes = [
	{ path: '', redirectTo: 'about', pathMatch: 'full' },
	{ path: 'appearance', component: AppearanceComponent },
	{ path: 'about', component: AboutComponent }
];

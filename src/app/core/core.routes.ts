import { Routes } from '@angular/router';
import { DatabaseGuard } from '../../jam/firestore';

export const routes: Routes = [
	{ path: 'profile', loadChildren: '../feature/profile/profile.module#ProfileModule', canLoad: [ DatabaseGuard ] },
	{ path: 'settings', loadChildren: '../feature/settings/settings.module#SettingsModule', canLoad: [ DatabaseGuard ] },
	{ path: 'customization', loadChildren: '../feature/customization/customization.module#CustomizationModule', canLoad: [ DatabaseGuard ] },
	{ path: 'photo-library', loadChildren: '../feature/photo-library/photo-library.module#PhotoLibraryModule', canLoad: [ DatabaseGuard ] },
	{ path: 'tag', loadChildren: '../feature/tag/tag.module#TagModule', canLoad: [ DatabaseGuard ] },
	{ path: '', redirectTo: 'customization', pathMatch: 'full' },
	{ path: '**', redirectTo: 'customization', pathMatch: 'full' }
];

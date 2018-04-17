import { Routes } from '@angular/router';
import { DatabaseGuard } from '../../jam/firestore';
import { AuthGuard, SignInComponent, RegisterComponent } from '../../jam/auth';

export const routes: Routes = [
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: 'profile', loadChildren: '../feature/profile/profile.module#ProfileModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: 'settings', loadChildren: '../feature/settings/settings.module#SettingsModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: 'customization', loadChildren: '../feature/customization/customization.module#CustomizationModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: 'media-library', loadChildren: '../feature/photo-library/photo-library.module#PhotoLibraryModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: 'tag', loadChildren: '../feature/tag/tag.module#TagModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: '', redirectTo: 'media-library', pathMatch: 'full' },
	{ path: '**', redirectTo: 'media-library', pathMatch: 'full' }
];

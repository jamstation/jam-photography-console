import { Routes } from '@angular/router';
import { DatabaseGuard } from '../../jam/firestore';
import { AuthGuard, SignInComponent, RegisterComponent } from '../../jam/auth';
import { UserGuard } from '../shared/layout';

export const routes: Routes = [
	{ path: 'home', loadChildren: '../feature/home/home.module#HomeModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard, UserGuard ] },
	{ path: 'sign-in', component: SignInComponent },
	{ path: 'register', component: RegisterComponent },
	{ path: ':company/dashboard', loadChildren: '../feature/dashboard/dashboard.module#DashboardModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: 'profile', loadChildren: '../feature/profile/profile.module#ProfileModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: ':company/settings', loadChildren: '../feature/settings/settings.module#SettingsModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: ':company/customization', loadChildren: '../feature/customization/customization.module#CustomizationModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: ':company/media-library', loadChildren: '../feature/photo-library/photo-library.module#PhotoLibraryModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: ':company/tag', loadChildren: '../feature/tag/tag.module#TagModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard ] },
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '**', redirectTo: 'home', pathMatch: 'full' }
];

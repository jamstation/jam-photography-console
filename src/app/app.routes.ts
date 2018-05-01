import { Routes } from '@angular/router';
import { DatabaseGuard } from '../jam/firestore';
import { AuthGuard, SignInComponent, RegisterComponent } from '../jam/auth';
import { UserGuard } from '../jam/auth/user.guard';
import { ErrorPageComponent } from './shared/error-page';

export const routes: Routes = [

	{ path: 'profile', loadChildren: './feature/profile/profile.module#ProfileModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard, UserGuard ] },
	{ path: 'home', loadChildren: './feature/home/home.module#HomeModule', canActivate: [ AuthGuard, UserGuard ], canLoad: [ DatabaseGuard ] },
	{ path: 'register', component: RegisterComponent, canActivate: [ DatabaseGuard ] },
	{ path: 'company/:company', loadChildren: './feature/company/company.module#CompanyModule', canActivate: [ AuthGuard ], canLoad: [ DatabaseGuard, UserGuard ] },


	{ path: 'sign-in', component: SignInComponent, canActivate: [ DatabaseGuard ] },
	{ path: 'register', component: RegisterComponent, canActivate: [ DatabaseGuard ] },

	{ path: 'error', component: ErrorPageComponent },

	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: '**', redirectTo: 'home', pathMatch: 'full' }
];

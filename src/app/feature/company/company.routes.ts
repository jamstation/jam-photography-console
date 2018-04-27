import { Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { CompanyGuard } from './company.guard';

export const routes: Routes = [
	{
		path: '', component: CompanyComponent, canActivate: [ CompanyGuard ], children: [
			{ path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
			{ path: 'settings', loadChildren: '../settings/settings.module#SettingsModule' },
			{ path: 'customization', loadChildren: '../customization/customization.module#CustomizationModule' },
			{ path: 'media-library', loadChildren: '../photo-library/photo-library.module#PhotoLibraryModule' },
			{ path: 'tag', loadChildren: '../tag/tag.module#TagModule' },
		]
	}
];

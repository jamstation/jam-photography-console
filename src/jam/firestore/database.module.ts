import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { configToken } from './database.config';
import { DatabaseGuard } from './database.guard';

@NgModule( {
    imports: [ AngularFireModule, AngularFirestoreModule ],
    providers: [ DatabaseGuard ]
} )
export class JamFirestoreModule
{
    static forRoot ( config: FirebaseAppConfig ): ModuleWithProviders
    {
        return {
            ngModule: JamFirestoreModule,
            providers: [
                DatabaseGuard,
                { provide: configToken, useValue: config }
            ],
        };
    }
}

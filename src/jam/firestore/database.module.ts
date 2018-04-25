import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';
import { configToken } from './database.config';
import { DatabaseGuard } from './database.guard';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';

@NgModule( {
    imports: [ AngularFirestoreModule ],
    providers: [ DatabaseGuard ]
} )
export class JamFirestoreModule
{
    static forRoot ( firebaseAppConfig: FirebaseAppConfig ): ModuleWithProviders
    {
        return {
            ngModule: JamFirestoreModule,
            providers: [
                DatabaseGuard,
                { provide: configToken, useValue: firebaseAppConfig }
            ],
        };
    }
}

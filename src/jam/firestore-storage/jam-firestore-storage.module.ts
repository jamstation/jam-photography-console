import { NgModule, ModuleWithProviders } from '@angular/core';
import { JamFirestoreStorage } from './jam-firestore-storage.service';

@NgModule( {
    providers: [ JamFirestoreStorage ]
} )
export class JamFirestoreStorageModule
{
    static forRoot (): ModuleWithProviders
    {
        return {
            ngModule: JamFirestoreStorageModule,
            providers: [ JamFirestoreStorage ],
        };
    }
}

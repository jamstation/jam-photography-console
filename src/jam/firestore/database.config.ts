import { InjectionToken } from '@angular/core';
import { FirebaseAppConfig } from 'angularfire2';

export const configToken = new InjectionToken<FirebaseAppConfig>( 'config' );

export const defaults = {
    databaseMetadataPath: 'Metadata/Database/Table'
}

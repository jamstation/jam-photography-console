import { FirestoreData } from './firestore-data.model';
import { UserRole } from './user-role.enum';
import { KeyValue } from './key-value.model';
import { FirestoreAccess } from './firestore-access.model';

export interface UserCompany extends FirestoreData
{
	role: UserRole;
	accesses: KeyValue<FirestoreAccess>;
}

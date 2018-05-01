import { FirestoreData } from './firestore-data.model';
import { UserRoles } from './user-role.enum';
import { KeyValue } from './key-value.model';
import { FirestoreAccess } from './firestore-access.model';

export interface UserCompany extends FirestoreData
{
	role: UserRoles;
	accesses?: KeyValue<FirestoreAccess>;
}

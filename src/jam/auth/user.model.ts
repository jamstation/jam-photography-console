import { FirestoreData } from "../../jam/model-library";

export interface User extends FirestoreData
{
    uid?: string;
    email: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
}

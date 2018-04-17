import { FirestoreData } from "../../jam/model-library";

export interface User extends FirestoreData
{
    email: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    photoURL?: string;
    phoneNumber?: string;
}

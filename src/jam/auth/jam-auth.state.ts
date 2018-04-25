import { User } from "./user.model";
import { Table } from "../firestore";

export interface AuthModuleState
{
	authState: AuthState;
}

export interface AuthState
{
	authenticated: boolean;
	user: User,
	userTable: Table<User>;
	registerPage: string;
	signInPage: string;
	redirectUrl: string;
	uiWidth: string;
	uiHeight: string;
	lastError: string;

	loading: boolean;
	initialized: boolean;
	registering: boolean;
	signingIn: boolean;
	signingOut: boolean;
	deletingUser: boolean;
}

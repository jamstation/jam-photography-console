import { AppModuleState } from "../../app.store";
import { User } from "../../../jam/auth";

export interface ProfileModuleState extends AppModuleState
{
	profileState: ProfileState
}

export interface ProfileState
{
	processing: boolean;
	editing: boolean;
	formItem: User;
}

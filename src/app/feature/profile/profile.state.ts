import { CoreModuleState } from "../../core/core.store";
import { User } from "../../../jam/auth";

export interface ProfileModuleState extends CoreModuleState
{
	profileState: ProfileState
}

export interface ProfileState
{
	processing: boolean;
	editing: boolean;
	formItem: User;
}

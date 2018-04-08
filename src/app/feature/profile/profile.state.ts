import { CoreModuleState } from "../../core/core.store";
import { Metadata } from "../../../jam/model-library";

export interface ProfileModuleState extends CoreModuleState
{
	profileState: ProfileState
}

export interface ProfileState
{
	processing: boolean;
}

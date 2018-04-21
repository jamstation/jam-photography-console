import { CoreModuleState } from "../../core/core.store";

export interface CustomizationModuleState extends CoreModuleState
{
	customizationState: CustomizationState
}

export interface CustomizationState
{
	processing: boolean;
	modifying: boolean;
}

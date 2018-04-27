import { AppModuleState } from "../../app.store";

export interface CustomizationModuleState extends AppModuleState
{
	customizationState: CustomizationState
}

export interface CustomizationState
{
	processing: boolean;
	modifying: boolean;
}

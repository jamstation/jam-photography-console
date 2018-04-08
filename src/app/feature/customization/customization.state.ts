import { CoreModuleState } from "../../core/core.store";
import { Metadata } from "../../../jam/model-library";

export interface CustomizationModuleState extends CoreModuleState
{
	customizationState: CustomizationState
}

export interface CustomizationState
{
	list: Metadata[];

	processing: boolean;
	editing: boolean;
}

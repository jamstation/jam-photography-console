import { CoreModuleState } from "../../core/core.store";
import { Metadata } from "../../../jam/model-library";

export interface SettingsModuleState extends CoreModuleState
{
	settingsState: SettingsState
}

export interface SettingsState
{
	processing: boolean;
}

import { CoreModuleState } from "../../core/core.store";

export interface SettingsModuleState extends CoreModuleState
{
	settingsState: SettingsState
}

export interface SettingsState
{
	processing: boolean;
	modifying: boolean;
}

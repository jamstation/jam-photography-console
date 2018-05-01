import { CompanyModuleState } from "../company";

export interface SettingsModuleState extends CompanyModuleState
{
	settingsState: SettingsState
}

export interface SettingsState
{
	processing: boolean;
	modifying: boolean;
}

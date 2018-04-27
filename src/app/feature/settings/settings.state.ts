import { AppModuleState } from "../../app.store";

export interface SettingsModuleState extends AppModuleState
{
	settingsState: SettingsState
}

export interface SettingsState
{
	processing: boolean;
	modifying: boolean;
}

import { KeyValue } from "../../../jam/model-library";
import { AppModuleState } from "../../app.store";

export interface DashboardModuleState extends AppModuleState
{
	dashboardState: DashboardState
}

export interface DashboardState
{
	processing: boolean;
	list: KeyValue<number>[];
}

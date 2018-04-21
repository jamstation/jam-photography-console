import { KeyValue } from "../../../jam/model-library";
import { CoreModuleState } from "../../core/core.store";

export interface DashboardModuleState extends CoreModuleState
{
	dashboardState: DashboardState
}

export interface DashboardState
{
	processing: boolean;
	list: KeyValue<number>[];
}

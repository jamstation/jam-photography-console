import { UserCompany } from "../../../jam/model-library";
import { CoreModuleState } from "../../core/core.store";

export interface HomeModuleState extends CoreModuleState
{
	homeState: HomeState
}

export interface HomeState
{
	processing: boolean;
	list: UserCompany[];
}

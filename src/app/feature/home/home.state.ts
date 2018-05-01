import { UserCompany } from "../../../jam/model-library";
import { AppModuleState } from "../../app.store";

export interface HomeModuleState extends AppModuleState
{
	homeState: HomeState
}

export interface HomeState
{
	processing: boolean;
	creating: boolean;
	list: UserCompany[];
	selectedItem: UserCompany;
}

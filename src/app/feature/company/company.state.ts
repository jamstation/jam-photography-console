import { Company } from "../../shared/model";
import { AppModuleState } from "../../app.store";

export interface CompanyModuleState extends AppModuleState
{
	companyState: CompanyState
}

export interface CompanyState
{
	selectedItem: Company;
}

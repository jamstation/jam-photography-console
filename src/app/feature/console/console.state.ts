import { Company } from "../../shared/model";
import { CoreModuleState } from "../../core/core.store";

export interface ConsoleModuleState extends CoreModuleState
{
	consoleState: ConsoleState
}

export interface ConsoleState
{
	processing: boolean;
	list: Company[];
}

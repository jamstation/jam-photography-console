import { Table } from "../../jam/firestore";
import { Metadata, LayoutItem } from '../../jam/model-library';
import { Photo } from "../shared/model";

export class Tables
{
	public Layout: Table<LayoutItem>;
	public GlobalLayout: Table<LayoutItem>;
	public Photo: Table<Photo>

	constructor () { }

}

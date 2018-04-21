import { Table } from "../../jam/firestore";
import { User } from "../../jam/auth";
import { Metadata, LayoutItem, KeyValue } from '../../jam/model-library';
import { Photo, Tag } from "../shared/model";

export class Tables
{
	public User: Table<User>;
	public Layout: Table<LayoutItem>;
	public GlobalLayout: Table<LayoutItem>;
	public Photo: Table<Photo>;
	public Tag: Table<Tag>;
	public Customization: Table<KeyValue>;
	public Settings: Table<KeyValue>;
	public Aggregate: Table<KeyValue<number>>;

	constructor () { }

}

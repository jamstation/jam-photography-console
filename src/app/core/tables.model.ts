import { Table } from "../../jam/firestore";
import { User } from "../../jam/auth";
import { Metadata, LayoutItem, KeyValue, UserCompany } from '../../jam/model-library';
import { Photo, Tag, Company } from "../shared/model";

export class Tables
{
	public User: Table<User>;
	public Company: Table<Company>;
	public UserCompany: Table<UserCompany>;
	public Layout: Table<LayoutItem>;
	public GlobalLayout: Table<LayoutItem>;
	public Photo: Table<Photo>;
	public Tag: Table<Tag>;
	public Customization: Table<KeyValue>;
	public Settings: Table<KeyValue>;
	public Aggregate: Table<KeyValue<number>>;

	constructor () { }

}

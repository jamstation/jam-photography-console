import { FirestoreData } from "./firestore-data.model";

export interface LayoutItem extends FirestoreData
{
	value?: string;
	category?: string;
	name?: string;
	label?: string;
	formControl?: string;
	index?: number;
	groupIndex?: number;
	groupLabel?: string;
	active?: boolean;
}

export function uniqueList<T>( list: T[], key: keyof T ): T[]
{
	let tempList: boolean[] = [];

	return list.filter( item =>
	{
		const value = item[ key as string ];
		const itemFound = tempList[ value ];

		tempList[ value ] = true;

		return !itemFound;
	} )
}

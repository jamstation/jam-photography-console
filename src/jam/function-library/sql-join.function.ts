export function sqlJoin<T>( leftList: T[], rightList: T[], joinKey: keyof T )
{
	return leftList.map( leftItem =>
	{
		const matchingRightItem = rightList.find( rightItem => rightItem[ joinKey ] == leftItem[ joinKey ] ) || {};
		return Object.assign( {}, leftItem, matchingRightItem );
	} );
}

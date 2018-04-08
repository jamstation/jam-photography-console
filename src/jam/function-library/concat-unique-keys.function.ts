export function concatUniqueKeys<T>( keyName: string, ...arrays: T[][] ): T[]
{
	console.log( keyName, arrays );
	arrays = arrays.reverse();
	return arrays.reduce( ( finalArray, array ) =>
	{
		return finalArray
			.concat( array
				.filter( item => finalArray
					.findIndex( finalArrayItem => item[ keyName ] == finalArrayItem[ keyName ] ) < 0 ) );
	}, [] );
}
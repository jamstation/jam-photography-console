export function concatUniqueKeys<T>( keyName: keyof T, ...arrays: T[][] ): T[]
{
	arrays = arrays.reverse();
	return arrays.reduce( ( finalArray, array ) =>
	{
		return finalArray
			.concat( array
				.filter( item => finalArray
					.findIndex( finalArrayItem => item[ keyName ] == finalArrayItem[ keyName ] ) < 0 ) );
	}, [] );
}

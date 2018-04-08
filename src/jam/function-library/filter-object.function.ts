export function filterObject<T>( obj: T, callbackFn: ( obj: T, prop: keyof T ) => boolean ): Partial<T>
{
	return Object.keys( obj )
		.filter( ( prop: keyof T ) => callbackFn( obj, prop ) )
		.reduce( ( accumulator, prop ) => ( { ...accumulator, [ prop ]: obj[ prop ] } ), {} );
}

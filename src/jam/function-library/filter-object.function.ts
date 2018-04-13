export function filterObject<T>( obj: T, callbackFn: ( val: any, prop?: keyof T, obj?: T ) => boolean ): Partial<T>
{
	return Object.keys( obj )
		.filter( ( prop: keyof T ) => callbackFn( obj[ prop ], prop, obj ) )
		.reduce( ( result, prop ) => ( { ...result, [ prop ]: obj[ prop ] } ), {} );
}

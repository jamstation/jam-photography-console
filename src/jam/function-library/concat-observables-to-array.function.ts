import { Observable } from "rxjs/Observable";
import { concat, skip, toArray } from "rxjs/operators";

export function concatObservablesToArray<T>( observables: Observable<T>[] ): Observable<T[]>
{
	return Observable.of( null ).pipe(
		concat( ...observables ),
		skip( 1 ),
		toArray()
	);
}

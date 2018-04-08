import { Observable } from "rxjs/Observable";

export type Observabled<T> = {
	[ P in keyof T ]: Observable<T[ P ]>;
};

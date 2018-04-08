import { Observable } from 'rxjs/Observable';
import { map, first, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { WriteBatch, WhereFilterOp } from '@firebase/firestore-types';
import { filterObject, concatObservablesToArray } from '../function-library';
import { FirestoreData, TableBase } from "../../jam/model-library";

export class Table<T extends FirestoreData = FirestoreData> implements TableBase
{

    public suppressConsoleMessages: boolean = true;
    public key: string;
    public name: string;
    public path: string;
    private collection: AngularFirestoreCollection<T>;

    constructor ( public db: AngularFirestore, name: string, path: string )
    {
        this.name = name || '';
        this.path = path || '';
        this.collection = this.pathValid ? this.db.collection<T>( this.path ) : null;
    }

    public get active (): boolean
    {
        return !!this.collection;
    }

    private get pathValid (): boolean
    {
        return ( this.path && this.path.indexOf( '{' ) < 0 );
    }

    public resolvePath ( collectionName: string, documentKey: string ): void
    {
        if ( !documentKey ) return;
        this.path = this.path.replace( '{' + collectionName + '}', documentKey );
        this.collection = this.pathValid ? this.db.collection<T>( this.path ) : null;
    }

    public get join (): Observable<T[]>
    {
        return this.collection.valueChanges();
    }

    public get list (): Observable<T[]>
    {
        return this.collection.valueChanges();
    }

    public listFirst ( limit: number ): Observable<T[]>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] listFirst -' + ' limit: ' + limit );
        return this.db.collection<T>( this.path, ref => ref.limit( limit ) ).valueChanges();
    }

    public find ( searchColumn: keyof T, searchKey: any ): Observable<T>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] find -' + ' searchColumn: ' + searchColumn + ' | searchKey: ' + searchKey );
        return this.filter( searchColumn, '==', searchKey, 1 ).map( list => list[ 0 ] );
    }

    public filter ( searchColumn: keyof T, operator: WhereFilterOp, searchKey: any, limit?: number ): Observable<T[]>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] filter -' + ' searchColumn: ' + searchColumn + ' | operator: ' + operator + ' | searchKey: ' + searchKey + ' | limit: ' + ( limit || 'none' ).toString() );
        return this.db
            .collection<T>( this.path, ref => limit
                ? ref.where( searchColumn, operator, searchKey ).limit( limit )
                : ref.where( searchColumn, operator, searchKey ) )
            .valueChanges();
    }

    public filterMany ( searchColumn: keyof T, keys: any[], limit?: number ): Observable<T[]>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] filterMany -' + ' searchColumn: ' + searchColumn + ' | keys: ' + keys, + ' | limit: ' + limit );
        const item$s = keys.map( key => this.find( searchColumn, key ).pipe( first() ) );
        const items$ = concatObservablesToArray( item$s );
        return items$ || Observable.of( [] );
    }

    public get ( key: string ): Observable<T>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] get', key );
        return key ? this.collection.doc<T>( key ).valueChanges() : Observable.of( null );
    }

    public getMany ( keys: string[] ): Observable<T[]>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] getMany', keys );
        const item$s = keys.map( key => this.get( key ) );
        const items$ = concatObservablesToArray( item$s );
        return items$ || Observable.of( [] );
    }

    public static clone ( sourceTable: Table<any>, targetTable: Table<any>, replace?: boolean ): Observable<boolean>
    {
        console.log( '[DATABASE] clone' );
        console.log( '[DATABASE] sourceTable', sourceTable.path );
        console.log( '[DATABASE] targetTable', targetTable.path );
        return targetTable.list.pipe(
            map( list => list.length > 0 ),
            switchMap( targetExists => targetExists && !replace
                ? Observable.of( false )
                : sourceTable.list.pipe(
                    map( sourceList => sourceList.reduce( ( result: WriteBatch, item ) =>
                        result.set( targetTable.collection.doc( item.key ).ref, item ),
                        sourceTable.db.firestore.batch() ) ),
                    switchMap( ( batch: WriteBatch ) => Observable.fromPromise( batch.commit() ).pipe( map( () => true ) ) )
                ) )
        );
    }

    public lookup ( searchKey: any, searchColumn?: string ): Observable<T>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] lookup', this.path, searchColumn || 'keyColumn', '==', searchKey );
        if ( !searchKey && !searchColumn ) return Observable.of( null );

        return searchColumn
            ? this.db.collection<T>( this.path, ref => ref.where( searchColumn, '==', searchKey ) )
                .valueChanges().pipe(
                    map( list => list[ 0 ] || null ),
                    first() )
            : this.get( searchKey ).pipe( first() );
    }

    public forceLookup ( item: T, searchKey: any = item.key, searchColumn?: string ): Observable<T>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] force-lookup', searchKey, searchColumn, item );
        return this.lookup( searchKey, searchColumn ).pipe(
            switchMap( lookedupItem => lookedupItem
                ? Observable.of( lookedupItem )
                : this.insert( item ) ) );
    }

    /**
     * Remove view model columns.
     * A column is a view model column if
     *  - it has a counterpart key column
     *  - it ends with $
     * @param item item for which the view model columns are to be removed
     */
    public removeVmColumns ( item: T ): Partial<T>
    {
        return filterObject<T>( item, ( data, column ) =>
            ( data[ column + 'Key' ] === undefined ) && !( column.endsWith( '$' ) ) );
    }

    public insert ( item: T ): Observable<T>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] insert', item );
        if ( !item ) return Observable.of<T>( null );

        item = this.removeVmColumns( item ) as T;

        let key$ = Observable.of( null ).pipe(
            switchMap( () => item.key
                ? this.lookup( item.key ).pipe(
                    switchMap( existingItem => existingItem
                        ? Observable.fromPromise( this.collection.doc( item.key ).set( item ) ).pipe(
                            map( () => item.key )
                        )
                        : Observable.of<string>( null ) ) )
                : Observable.fromPromise( this.collection.add( item ) ).pipe(
                    map( docRef => docRef.id )
                ) )
        );

        return key$.pipe(
            switchMap( key => !key
                ? Observable.of( null )
                /*  Update key back  */
                : Observable.fromPromise( this.collection.doc( key ).update( { key: key } ) ).pipe(
                    /*  Fetch and return object  */
                    /*  Due to timing issue, the item is fetched before the update, hence the following workaround */
                    switchMap( () => this.get( key ).pipe(
                        first(),
                        map( insertedItem => Object.assign( insertedItem, { key: insertedItem.key || key } ) )
                    ) )
                ) )
        );
    }

    public insertMany ( list: T[] ): Observable<T[]>
    {
        return concatObservablesToArray( list.map( item => this.insert( item ) ) );
    }

    public updateElseInsertMany ( list: T[], searchColumn?: keyof T ): Observable<T[]>
    {
        return concatObservablesToArray( list.map( item =>
            this.updateElseInsert( item, item[ searchColumn ], searchColumn ) ) );
    }

    public update ( item: T, searchKey?: any, searchColumn?: keyof T ): Observable<T>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] update', item );
        if ( !item ) return null;
        /**
         * You can lookup via key or other columns.
         * Lookup via key - item.key
         * Lookup via columns - searchKey.
         */
        item = this.removeVmColumns( item ) as T;
        searchKey = searchKey || item.key;

        /**
         * Get existing item
         * Exit this function if existing item is not found
         */
        return this.lookup( searchKey, searchColumn ).pipe(
            switchMap( existingItem => !existingItem
                ? Observable.of<T>( null )
                /**
                 * If search key was used, we cannot guarantee item key will be present,
                 * hence get it from looked up item
                 */
                : Observable.fromPromise( this.collection.doc( existingItem.key ).set( Object.assign( item, { key: item.key || existingItem.key } ) ) ).pipe(
                    switchMap( () => this.get( existingItem.key ).pipe( first() ) ) ) ) );

    }

    public updateElseInsert ( item: T, searchKey?: any, searchColumn?: keyof T ): Observable<T>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] updateElseInsert', item );
        return this.update( item, searchKey, searchColumn ).pipe(
            switchMap( updatedItem => updatedItem
                ? Observable.of( updatedItem )
                : this.insert( item ) ) );
    }

    public updateFields ( item: T, searchKey?: any, searchColumn?: keyof T ): Observable<T>
    {
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] update-fields', item );
        if ( !item ) return null;
        /**
         * You can lookup via key or other columns.
         * Lookup via key - item.key
         * Lookup via columns - searchKey.
         */
        item = this.removeVmColumns( item ) as T;
        searchKey = searchKey || item.key;

        /**
         * Remove empty fields and prepare new object with fields to be updated
         */
        let newItem = { key: null };
        Object.keys( item ).forEach( key => item[ key ] !== null && ( newItem[ key ] = item[ key ] ) );

        /**
         * Get existing item
         * If found - update
         * Else - null
         */
        return this.lookup( searchKey, searchColumn ).pipe(
            switchMap( existingItem => !existingItem
                ? Observable.of<T>( null )
                : Observable.fromPromise( this.collection.doc( existingItem.key ).update( newItem ) ).pipe(
                    switchMap( () => this.get( existingItem.key ).pipe( first() ) ) ) ) );
    }

    public remove ( searchKey: any, searchColumn?: keyof T ): Observable<T>
    {

        if ( !searchKey ) return Observable.of<T>( null );
        /**
         * Get existing item
         * Exit this function if existing item is not found
         */
        if ( !this.suppressConsoleMessages ) console.log( '[DATABASE] delete', searchColumn, searchKey );
        return this.lookup( searchKey, searchColumn ).pipe(
            switchMap( existingItem => !existingItem
                /* Delete failed since existing item not found. Send 'false' signal */
                ? Observable.of( false )
                /* Delete succeeded. Send 'true' signal */
                : Observable.fromPromise( this.collection.doc( existingItem.key ).delete() ).pipe(
                    map( () => true ) ),
                /* If signal is 'true', send deleted item ( found in lookup ) */
                ( outerValue, innerValue ) => innerValue ? outerValue : null ) );

    }

    public removeMany ( searchKeys: any[], searchColumn?: keyof T ): Observable<T[]>
    {
        return concatObservablesToArray( searchKeys.map( key => this.remove( key, searchColumn ) ) );
    }

}

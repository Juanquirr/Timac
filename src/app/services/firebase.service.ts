import { Injectable } from '@angular/core';
import {Firestore, collection, query, where, collectionData} from '@angular/fire/firestore';
import { Observable, of, combineLatest } from 'rxjs';
import {Product} from '../models/product.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  getFilteredData(collectionName: string, field: string, value: any): Observable<any[]> {
    const collRef = collection(this.firestore, collectionName);
    const q = query(collRef, where(field, '==', value));
    return collectionData(q) as Observable<any[]>;
  }

  getProductByFieldId(collectionName: string, productId: number): Observable<Product[]> {
    const coll = collection(this.firestore, collectionName);
    const q = query(coll, where('id', '==', productId));
    return collectionData(q) as Observable<Product[]>;
  }

  getDataObservable(collectionName: string): Observable<any[]> {
    const collRef = collection(this.firestore, collectionName);
    return collectionData(collRef) as Observable<any[]>;
  }

  getDataByArrayContains(collectionName: string, field: string, searchString: string): Observable<Product[]> {
    const collRef = collection(this.firestore, collectionName);
    const words = searchString
      .split(' ')
      .map(word => word.trim())
      .filter(word => word.length > 0);

    if (words.length === 0) {
      return of([]);
    }

    const queries = words.map(word => {
      const q = query(collRef, where(field, 'array-contains', word));
      return collectionData(q, { idField: 'id' }) as Observable<Product[]>;
    });

    return combineLatest(queries).pipe(
      map(results => {
        const allItems = results.flat();
        const uniqueItemsMap = new Map<number, Product>();
        allItems.forEach(item => {
          uniqueItemsMap.set(item.id, item);
        });
        return Array.from(uniqueItemsMap.values());
      })
    );
  }


}

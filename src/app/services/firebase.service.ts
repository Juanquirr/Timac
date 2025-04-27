import { Injectable } from '@angular/core';
import {Firestore, collection, query, where, collectionData} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Product} from '../models/product.model';

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
}

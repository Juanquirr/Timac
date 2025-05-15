import { Injectable } from '@angular/core';
import {collection, collectionData, doc, docData, Firestore, query, updateDoc, where} from "@angular/fire/firestore";
import { Observable} from "rxjs";
import {Product} from "../model/product.model";
import {BasketItem} from "../model/basketItem.model";


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {
  }

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

  getUserById(uid: string): Observable<any> {
    const docRef = doc(this.firestore, 'users', uid);
    return docData(docRef) as Observable<any>;
  }

  async updateUserBasket(uid: string, basket: BasketItem[]): Promise<void> {
    const docRef = doc(this.firestore, 'users', uid);
    updateDoc(docRef, {basket})
  }
}

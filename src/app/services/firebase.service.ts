import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, orderBy, where} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  async getData(collectionName: string) {
    const coll = collection(this.firestore, collectionName);
    const q = query(coll, orderBy('id', 'asc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
  async getFilteredData(collectionName: string, field: string, value: any): Promise<any[]> {
    const coll = collection(this.firestore, collectionName);
    const q = query(coll, where(field, '==', value));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async getProductByFieldId(collectionName: string, productId: number): Promise<any> {
    const coll = collection(this.firestore, collectionName);
    const q = query(coll, where('id', '==', productId));
    const snapshot = await getDocs(q);
    const doc = snapshot.docs[0];
    return doc ? {docId: doc.id, ...doc.data()} : null;
  }
}

import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  constructor(private firestore: Firestore) {}

  async addData(data: any, collectionName: string) {
    const coll = collection(this.firestore, collectionName);
    return await addDoc(coll, data);
  }

  async getData(collectionName: string) {
    const coll = collection(this.firestore, collectionName);
    const snapshot = await getDocs(coll);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }

  async updateData(collectionName: string, docId: string, data: any) {
    const docRef = doc(this.firestore, collectionName, docId);
    return await updateDoc(docRef, data);
  }

  async deleteData(collectionName: string, docId: string) {
    const docRef = doc(this.firestore, collectionName, docId);
    return await deleteDoc(docRef);
  }
}

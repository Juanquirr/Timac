import { Injectable } from '@angular/core';
import {doc, Firestore, setDoc} from '@angular/fire/firestore';
import {
  Auth, authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from '@angular/fire/auth';
import { UserCredential } from 'firebase/auth';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register(email: string, password: string, additionalData: { name: string; phone: string; birthDate: string}): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {displayName: additionalData.name});

      await setDoc(doc(this.firestore, 'users', user.uid), {
        email: user.email,
        name: additionalData.name,
        phone: additionalData.phone,
        birthDate: additionalData.birthDate,
        basket: []
      });

      return userCredential;
    } catch (error) {
      throw error;
    }
  }

  async login(email: string, password: string): Promise<UserCredential> {
    try {
      return await signInWithEmailAndPassword(this.auth, email, password)
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      throw error;
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  getAuthState(): Observable<any> {
    return authState(this.auth);
  }

}

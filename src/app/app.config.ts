import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideHttpClient } from '@angular/common/http';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp({
      apiKey: "AIzaSyCNdxS8LnS3qWt3fIXPPNw_DEYb6RSwLSk",
      authDomain: "timac-eec8e.firebaseapp.com",
      projectId: "timac-eec8e",
      storageBucket: "timac-eec8e.appspot.com",
      messagingSenderId: "392105769015",
      appId: "1:392105769015:web:1f7c013a54a24472da27b2"
    })),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ]
};

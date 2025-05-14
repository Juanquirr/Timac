import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {getAuth, provideAuth} from "@angular/fire/auth";

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({ projectId: "timac-eec8e", appId: "1:392105769015:web:1f7c013a54a24472da27b2", storageBucket: "timac-eec8e.firebasestorage.app", apiKey: "AIzaSyCNdxS8LnS3qWt3fIXPPNw_DEYb6RSwLSk", authDomain: "timac-eec8e.firebaseapp.com", messagingSenderId: "392105769015" })), provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth())
  ],
});

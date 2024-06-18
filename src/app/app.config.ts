import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-ba164","appId":"1:942046666148:web:623b203a609cc2ec4c3531","storageBucket":"ring-of-fire-ba164.appspot.com","apiKey":"AIzaSyDFGBkkrUwtmxfzcgJ9Fva1q0RfmFrp_Us","authDomain":"ring-of-fire-ba164.firebaseapp.com","messagingSenderId":"942046666148"})), provideFirestore(() => getFirestore())]
};

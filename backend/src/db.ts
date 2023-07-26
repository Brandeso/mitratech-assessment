import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore"

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PROJECT_KEY
  }),
});

export const db = getFirestore()
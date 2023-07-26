import { initializeApp, applicationDefault, cert } from "firebase-admin/app";
import { getFirestore, Timestamp, Filter, FieldValue } from "firebase-admin/firestore"
const serviceAccount = require("../firebase-cert.json");

initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore()
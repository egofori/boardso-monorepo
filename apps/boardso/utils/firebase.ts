import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

export const firebaseConfig = {
  apiKey: "AIzaSyAqq7eY78AXBKm_HGmapE-LU4TTFiPvoVs",
  authDomain: "boardso.firebaseapp.com",
  projectId: "boardso",
  storageBucket: "boardso.appspot.com",
  messagingSenderId: "647257180292",
  appId: "1:647257180292:web:ed2933a94df35b28ce9ad1",
  measurementId: "G-7Y2EX17KHW",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const firebaseAuth = getAuth(app)

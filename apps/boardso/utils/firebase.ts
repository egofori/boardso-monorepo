import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import * as config from "../firebaseConfig.json"

export const firebaseConfig: any = config || {}

// Initialize Firebase
const app = initializeApp(firebaseConfig[process.env["NODE_ENV"]])

export const firebaseAuth = getAuth(app)

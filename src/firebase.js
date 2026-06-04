import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'

function requiredEnv(name) {
  const value = import.meta.env[name]
  if (!value) {
    throw new Error(`Falta la variable de entorno ${name}. Copia .env.example a .env y complétala.`)
  }
  return value
}

export const firebaseConfig = {
  apiKey: requiredEnv('VITE_FIREBASE_API_KEY'),
  authDomain: requiredEnv('VITE_FIREBASE_AUTH_DOMAIN'),
  databaseURL: requiredEnv('VITE_FIREBASE_DATABASE_URL'),
  projectId: requiredEnv('VITE_FIREBASE_PROJECT_ID'),
  storageBucket: requiredEnv('VITE_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: requiredEnv('VITE_FIREBASE_MESSAGING_SENDER_ID'),
  appId: requiredEnv('VITE_FIREBASE_APP_ID'),
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
}

let app = null
let db = null

export function getDb() {
  if (!db) {
    app = initializeApp(firebaseConfig)
    db = getDatabase(app, firebaseConfig.databaseURL)
  }
  return db
}

export function getActiveKeyRef() {
  return ref(getDb(), 'activeKey')
}

export function getConnectedRef() {
  return ref(getDb(), '.info/connected')
}

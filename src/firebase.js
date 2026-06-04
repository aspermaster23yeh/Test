import { initializeApp } from 'firebase/app'
import { getDatabase, ref } from 'firebase/database'

export const firebaseConfig = {
  apiKey: 'AIzaSyAAlGwdCWibgfY7ddSvRT4PXOXaqcyV9V0',
  authDomain: 'yare-968de.firebaseapp.com',
  databaseURL: 'https://yare-968de-default-rtdb.firebaseio.com',
  projectId: 'yare-968de',
  storageBucket: 'yare-968de.firebasestorage.app',
  messagingSenderId: '798186235220',
  appId: '1:798186235220:web:2b736728dccf7fd4d0d4c1',
  measurementId: 'G-LTVX7HFV87',
}

const app = initializeApp(firebaseConfig)
export const db = getDatabase(app)
export const activeKeyRef = ref(db, 'activeKey')

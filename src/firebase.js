

import { initializeApp } from 'firebase/app'

import { getAuth } from 'firebase/auth'

import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyDk1ENL9nAHAst1L5bYGJc_tJD-llSXdJ4',
  authDomain: 'emergency-support-492a4.firebaseapp.com',
  projectId: 'emergency-support-492a4',
  storageBucket: 'emergency-support-492a4.firebasestorage.app',
  messagingSenderId: '1069547124816',
  appId: '1:1069547124816:web:4ec634abd27e390e3cb955',
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const database = getDatabase(app)

export default app
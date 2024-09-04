// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
  getAuth,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getFirestore} from 'firebase/firestore';
// import { getFirestore, collection, doc, addDoc, getDocs, query, where, deleteDoc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDmMvwfyPVvT3yAQdEb6hpy9hAETslYvCM',
  authDomain: 'musik-fb7cf.firebaseapp.com',
  projectId: 'musik-fb7cf',
  storageBucket: 'musik-fb7cf.appspot.com',
  messagingSenderId: '518526851508',
  appId: '1:518526851508:web:41d1b1341f3e30d947bae1',
  measurementId: 'G-CFQEHSPLZM',
};

const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
// export const tripRef = collection(db, 'trips');
// export const expensesRef = collection(db, 'expenses');
export default app;

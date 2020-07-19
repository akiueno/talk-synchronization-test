import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';

import {firebaseConfig} from './config.js';

export const firebaseApp = firebase.initializeApp(firebaseConfig);

console.log('firebaseConfig');
console.log(firebaseApp);
console.log('firebaseConfig');

export const firebaseDb = firebaseApp.database();
export const firestore = firebaseApp.firestore();

export default firebase;

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyBU5R6f2CRDy2YzzTBIAXm3S--M7OaPAgo',
  authDomain: 'spesa-44b4d.firebaseapp.com',
  projectId: 'spesa-44b4d',
  storageBucket: 'spesa-44b4d.appspot.com',
  messagingSenderId: '1015218529106',
  appId: '1:1015218529106:web:ba01a73c5edb8b415f508b',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

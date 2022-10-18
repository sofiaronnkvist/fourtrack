import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_apiKey,
//   authDomain: process.env.NEXT_PUBLIC_authDomain,
//   projectId: process.env.NEXT_PUBLIC_projectId,
//   storageBucket: process.env.NEXT_PUBLIC_storageBucket,
//   messagingSenderId: process.env.NEXT_PUBLIC_messagingSenderId,
//   appId: process.env.NEXT_PUBLIC_appId,
// };

const firebaseConfig = {
  apiKey: 'AIzaSyB1f0BDMrMeCTfvFjaG32PjjPPdMuHfLW4',
  authDomain: 'test-fourtrack.firebaseapp.com',
  projectId: 'test-fourtrack',
  storageBucket: 'test-fourtrack.appspot.com',
  messagingSenderId: '843160354709',
  appId: '1:843160354709:web:9ae196ec3744c0354b809c',
};

const app = initializeApp(firebaseConfig);

const storage = getStorage(app);

export { storage, app };

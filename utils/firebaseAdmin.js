import * as firebaseAdmin from 'firebase-admin';
import serviceAccount from '../secrets.json';

export const verifyIdToken = (token) => {
  if (!firebaseAdmin.apps.length) {
    firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert(serviceAccount),
    });
  }
  return firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .catch((err) => {
      throw err;
    });
};

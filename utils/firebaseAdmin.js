import * as firebaseAdmin from 'firebase-admin';
const serviceAccount = JSON.parse(
  process.env.NEXT_PUBLIC_GOOGLE_APPLICATION_CREDENTIALS
);

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

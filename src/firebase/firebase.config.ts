import * as admin from 'firebase-admin';
import * as fireorm from 'fireorm';

export function initializeFirebase() {
    var serviceAccount = JSON.parse(process.env.FIREBASE);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: `https://${serviceAccount.project_id}.firebaseio.com/`
    });
    const firestore = admin.firestore();
    firestore.settings({
        timestampsInSnapshots: true,
      });
    fireorm.initialize(firestore);
}
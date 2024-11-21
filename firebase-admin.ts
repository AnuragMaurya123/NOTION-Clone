import { getApp, getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";



let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY, // Handle newline characters
      clientEmail: process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { adminDb, app as adminApp };

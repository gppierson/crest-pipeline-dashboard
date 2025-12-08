import 'server-only';
import admin from 'firebase-admin';

if (!admin.apps.length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;

    if (!projectId || !clientEmail || !privateKey) {
        console.error('Missing Firebase Admin environment variables:', {
            projectId: !!projectId,
            clientEmail: !!clientEmail,
            privateKey: !!privateKey,
        });
        throw new Error('Missing specific Firebase Admin environment variables. Check server logs.');
    }

    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId,
                clientEmail,
                privateKey: privateKey.replace(/\\n/g, '\n'),
            }),
        });
        console.log('Firebase Admin initialized successfully');
    } catch (error) {
        console.error('Firebase Admin initialization failed:', error);
        throw error;
    }
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();

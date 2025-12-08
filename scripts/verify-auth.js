const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// 1. Load Environment Variables from .env.local
try {
    const envPath = path.resolve(__dirname, '../.env.local');
    const envFile = fs.readFileSync(envPath, 'utf8');
    const lines = envFile.split('\n');
    lines.forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join('=').trim();
            // Remove quotes if present
            if (value.startsWith('"') && value.endsWith('"')) {
                value = value.slice(1, -1);
            }
            // Handle newlines in private key
            value = value.replace(/\\n/g, '\n');
            process.env[key] = value;
        }
    });
    console.log('Loaded .env.local');
} catch (e) {
    console.error('Could not load .env.local:', e.message);
}

// 2. Initialize Firebase Admin
if (!admin.apps.length) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                privateKey: process.env.FIREBASE_PRIVATE_KEY
            }),
        });
        console.log('Firebase Admin Initialized');
    } catch (error) {
        console.error('Error initializing Firebase Admin:', error);
        process.exit(1);
    }
}

// 3. List Users
async function listUsers() {
    try {
        const listUsersResult = await admin.auth().listUsers(10);
        console.log('Successfully fetched user data:');
        listUsersResult.users.forEach((userRecord) => {
            console.log(' -', userRecord.uid, userRecord.email);
        });
        if (listUsersResult.users.length === 0) {
            console.log('No users found.');
        }
    } catch (error) {
        console.log('Error listing users:', error);
    }
}


// 4. Create or Update Test User
async function createTestUser() {
    const email = 'test@crestutah.com';
    const password = 'password123';

    try {
        try {
            const userRecord = await admin.auth().getUserByEmail(email);
            console.log('Test user exists:', userRecord.uid);
            await admin.auth().updateUser(userRecord.uid, { password });
            console.log('Test user password updated to:', password);
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                const userRecord = await admin.auth().createUser({ email, password });
                console.log('Test user created:', userRecord.uid);
                console.log('Password set to:', password);
            } else {
                throw error;
            }
        }
    } catch (error) {
        console.error('Error creating/updating test user:', error);
    }
}

createTestUser();


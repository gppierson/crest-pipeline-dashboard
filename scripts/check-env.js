const fs = require('fs');
const path = require('path');

// Helper to load env vars manually if not using dotenv
function loadEnv(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split('\n').forEach(line => {
        const parts = line.split('=');
        if (parts.length >= 2) {
            const key = parts[0].trim();
            let value = parts.slice(1).join('=').trim();
            if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            env[key] = value;
        }
    });
    return env;
}

// Load .env.local first, then .env
const envLocal = loadEnv(path.resolve(__dirname, '../.env.local'));
const env = loadEnv(path.resolve(__dirname, '../.env'));
const combinedEnv = { ...env, ...envLocal, ...process.env };

const MOCK_KEY = 'mock-key-for-build';
const apiKey = combinedEnv.NEXT_PUBLIC_FIREBASE_API_KEY;

if (!apiKey) {
    console.error('❌ Error: NEXT_PUBLIC_FIREBASE_API_KEY is missing!');
    process.exit(1);
}

if (apiKey === MOCK_KEY) {
    console.error('❌ Error: NEXT_PUBLIC_FIREBASE_API_KEY is set to "mock-key-for-build"!');
    console.error('   Please ensure you have a valid .env.local file with real credentials.');
    process.exit(1);
}

console.log('✅ Environment variables look valid.');

#!/bin/bash

# Ensure dependencies are installed
echo "Checking dependencies..."
if [ ! -d "node_modules" ]; then
    npm install
fi

# Build the application if .next doesn't exist or if requested
if [ ! -d ".next" ] || [ "$1" == "--rebuild" ]; then
    echo "Building application..."
    npx prisma generate
    npm run build
fi

# Start with PM2
echo "Starting Crest Dashboard in background..."
npx pm2 start ecosystem.config.js

echo ""
echo "✅ Dashboard is running at http://localhost:3000"
echo "To stop it, run: npx pm2 stop crest-dashboard"
echo "To see logs, run: npx pm2 logs crest-dashboard"

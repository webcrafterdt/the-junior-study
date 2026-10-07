#!/bin/sh
set -e

echo "===== XCODE CLOUD POST CLONE START ====="

echo "Node version:"
node -v

echo "NPM version:"
npm -v

echo "Moving to project root..."

cd "$CI_PRIMARY_REPOSITORY_PATH"

echo "Current directory:"
pwd

echo "Installing npm dependencies..."
npm ci

echo "Building Angular..."
npm run build

echo "Syncing Capacitor..."
npx cap sync ios

echo "===== XCODE CLOUD POST CLONE FINISHED ====="
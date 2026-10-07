# #!/bin/sh
# set -e

# echo "===== XCODE CLOUD POST CLONE START ====="

# echo "Node version:"
# node -v

# echo "NPM version:"
# npm -v

# echo "Moving to project root..."

# cd "$CI_PRIMARY_REPOSITORY_PATH"

# echo "Current directory:"
# pwd

# echo "Installing npm dependencies..."
# npm ci

# echo "Building Angular..."
# npm run build

# echo "Syncing Capacitor..."
# npx cap sync ios

# echo "===== XCODE CLOUD POST CLONE FINISHED ====="

#!/bin/sh
set -e

echo "===== XCODE CLOUD POST CLONE START ====="

echo "Checking Node environment..."

echo "PATH:"
echo "$PATH"

echo "Checking node:"
which node || true

echo "Checking nvm:"
command -v nvm || true

echo "Checking common Node locations:"
ls -la /opt/homebrew/bin/node 2>/dev/null || true
ls -la /usr/local/bin/node 2>/dev/null || true

echo "===== NODE ENVIRONMENT CHECK COMPLETE ====="

exit 1
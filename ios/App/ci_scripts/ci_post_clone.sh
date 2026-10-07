#!/bin/sh
set -e

echo "===== HOMEBREW / NODE DIAGNOSTIC ====="

echo "Architecture:"
uname -m

echo "macOS:"
sw_vers

echo "Homebrew:"
which brew
brew --version

echo "Homebrew prefix:"
brew --prefix

echo "Homebrew config:"
brew config

echo "Node formula:"
brew info node

echo "===== END DIAGNOSTIC ====="

exit 1
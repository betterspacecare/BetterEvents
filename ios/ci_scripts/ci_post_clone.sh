#!/bin/sh

# Fail on any error
set -e

# Navigate to the project root (assuming script is in ios/ci_scripts)
# $0 is the path to the script. dirname gives the directory containing the script.
# We go up two levels: ios/ci_scripts -> ios -> root
cd "$(dirname "$0")/../.."

# Install Node.js
echo "Installing Node.js..."
brew install node

# Install dependencies
echo "Installing npm dependencies..."
npm install

# Install CocoaPods dependencies
echo "Installing CocoaPods dependencies..."
cd ios
pod install

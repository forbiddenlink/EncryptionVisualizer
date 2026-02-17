#!/bin/bash

# Encryption Visualizer - Fresh Start Script
# This script performs a complete clean restart of the development server

echo "🧹 Cleaning all build artifacts..."

# Navigate to project directory
cd "$(dirname "$0")/encryption-visualizer"

# Kill any existing dev servers
echo "🛑 Stopping any running dev servers..."
lsof -ti:3000,3001,3002,3003,3004 2>/dev/null | xargs kill -9 2>/dev/null || true

# Remove all cache and build directories
echo "🗑️  Removing cache directories..."
rm -rf node_modules/.vite
rm -rf .vite
rm -rf dist
rm -rf node_modules/.cache

# Clear pnpm cache
echo "🧼 Clearing pnpm cache..."
pnpm store prune || true

echo "✅ Clean complete!"
echo ""
echo "🚀 Starting fresh dev server..."
echo ""

# Start dev server
pnpm run dev

echo ""
echo "✨ Server started! Open http://localhost:3000 in a NEW INCOGNITO WINDOW"
echo ""

#!/bin/bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
cd "$PROJECT_DIR"

echo "Installing dependencies..."
pnpm install

echo "Installing serve for static serving..."
pnpm add -D serve

echo "Building frontend with Vite..."
pnpm vite build

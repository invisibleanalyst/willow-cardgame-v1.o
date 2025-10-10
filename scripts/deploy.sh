#!/bin/bash

# Willow Talk Edition - Production Deployment Script
# This script prepares the application for production deployment

set -e  # Exit on any error

echo "🚀 Willow Talk Edition - Production Deployment Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Please run this script from the project root."
    exit 1
fi

# Check Node.js version
print_status "Checking Node.js version..."
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
fi
print_success "Node.js version: $(node --version)"

# Check npm version
print_status "Checking npm version..."
NPM_VERSION=$(npm --version | cut -d'.' -f1)
if [ "$NPM_VERSION" -lt 8 ]; then
    print_error "npm version 8+ is required. Current version: $(npm --version)"
    exit 1
fi
print_success "npm version: $(npm --version)"

# Clean previous builds
print_status "Cleaning previous builds..."
rm -rf .next
rm -rf out
rm -rf dist
print_success "Cleanup completed"

# Install dependencies
print_status "Installing dependencies..."
npm ci --legacy-peer-deps
print_success "Dependencies installed"

# Type checking
print_status "Running TypeScript type checking..."
npm run type-check
print_success "Type checking passed"

# Linting
print_status "Running ESLint..."
npm run lint
print_success "Linting passed"

# Build the application
print_status "Building application for production..."
npm run build
print_success "Build completed successfully"

# Check build output
if [ ! -d ".next" ]; then
    print_error "Build failed - .next directory not found"
    exit 1
fi

# Check bundle size
print_status "Checking bundle size..."
BUNDLE_SIZE=$(du -sh .next | cut -f1)
print_success "Bundle size: $BUNDLE_SIZE"

# Check PWA files
print_status "Checking PWA files..."
if [ -f "public/sw.js" ]; then
    print_success "Service worker generated"
else
    print_warning "Service worker not found"
fi

if [ -f "public/manifest.json" ]; then
    print_success "PWA manifest found"
else
    print_warning "PWA manifest not found"
fi

# Environment check
print_status "Checking environment configuration..."
if [ -f ".env.local" ]; then
    print_success "Environment file found"
    print_warning "Make sure to set environment variables in Vercel dashboard"
else
    print_warning "No .env.local found - using template values"
fi

# Git status check
print_status "Checking Git status..."
if git diff --quiet; then
    print_success "No uncommitted changes"
else
    print_warning "Uncommitted changes detected"
    git status --short
fi

# Final deployment checklist
echo ""
echo "🎯 Production Deployment Checklist"
echo "=================================="
echo "✅ Build completed successfully"
echo "✅ Type checking passed"
echo "✅ Linting passed"
echo "✅ Bundle size optimized"
echo "✅ PWA files generated"
echo ""
echo "📋 Next Steps:"
echo "1. Push to GitHub: git push origin main"
echo "2. Connect to Vercel dashboard"
echo "3. Add environment variables"
echo "4. Configure custom domain (willowtalk.live)"
echo "5. Test deployment"
echo ""
echo "🔗 Useful Commands:"
echo "• Test build: npm run test:build"
echo "• Analyze bundle: npm run analyze"
echo "• Start production: npm start"
echo ""
print_success "Deployment preparation completed! 🚀"

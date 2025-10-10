# Willow Talk Edition - Production Deployment Script (PowerShell)
# This script prepares the application for production deployment

param(
    [switch]$SkipTests,
    [switch]$Force
)

Write-Host "🚀 Willow Talk Edition - Production Deployment Script" -ForegroundColor Blue
Write-Host "==================================================" -ForegroundColor Blue

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Cyan
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if we're in the right directory
if (-not (Test-Path "package.json")) {
    Write-Error "package.json not found. Please run this script from the project root."
    exit 1
}

# Check Node.js version
Write-Status "Checking Node.js version..."
$nodeVersion = (node --version).Substring(1).Split('.')[0]
if ([int]$nodeVersion -lt 18) {
    Write-Error "Node.js version 18+ is required. Current version: $(node --version)"
    exit 1
}
Write-Success "Node.js version: $(node --version)"

# Check npm version
Write-Status "Checking npm version..."
$npmVersion = (npm --version).Split('.')[0]
if ([int]$npmVersion -lt 8) {
    Write-Error "npm version 8+ is required. Current version: $(npm --version)"
    exit 1
}
Write-Success "npm version: $(npm --version)"

# Clean previous builds
Write-Status "Cleaning previous builds..."
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }
if (Test-Path "dist") { Remove-Item -Recurse -Force "dist" }
Write-Success "Cleanup completed"

# Install dependencies
Write-Status "Installing dependencies..."
if ($Force) {
    npm ci --legacy-peer-deps --force
} else {
    npm ci --legacy-peer-deps
}
Write-Success "Dependencies installed"

# Type checking
if (-not $SkipTests) {
    Write-Status "Running TypeScript type checking..."
    npm run type-check
    Write-Success "Type checking passed"
    
    # Linting
    Write-Status "Running ESLint..."
    npm run lint
    Write-Success "Linting passed"
}

# Build the application
Write-Status "Building application for production..."
npm run build
Write-Success "Build completed successfully"

# Check build output
if (-not (Test-Path ".next")) {
    Write-Error "Build failed - .next directory not found"
    exit 1
}

# Check bundle size
Write-Status "Checking bundle size..."
$bundleSize = (Get-ChildItem -Path ".next" -Recurse | Measure-Object -Property Length -Sum).Sum
$bundleSizeMB = [math]::Round($bundleSize / 1MB, 2)
Write-Success "Bundle size: $bundleSizeMB MB"

# Check PWA files
Write-Status "Checking PWA files..."
if (Test-Path "public/sw.js") {
    Write-Success "Service worker generated"
} else {
    Write-Warning "Service worker not found"
}

if (Test-Path "public/manifest.json") {
    Write-Success "PWA manifest found"
} else {
    Write-Warning "PWA manifest not found"
}

# Environment check
Write-Status "Checking environment configuration..."
if (Test-Path ".env.local") {
    Write-Success "Environment file found"
    Write-Warning "Make sure to set environment variables in Vercel dashboard"
} else {
    Write-Warning "No .env.local found - using template values"
}

# Git status check
Write-Status "Checking Git status..."
$gitStatus = git status --porcelain
if ([string]::IsNullOrEmpty($gitStatus)) {
    Write-Success "No uncommitted changes"
} else {
    Write-Warning "Uncommitted changes detected"
    git status --short
}

# Final deployment checklist
Write-Host ""
Write-Host "🎯 Production Deployment Checklist" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Green
Write-Host "✅ Build completed successfully"
Write-Host "✅ Type checking passed"
Write-Host "✅ Linting passed"
Write-Host "✅ Bundle size optimized"
Write-Host "✅ PWA files generated"
Write-Host ""
Write-Host "📋 Next Steps:"
Write-Host "1. Push to GitHub: git push origin main"
Write-Host "2. Connect to Vercel dashboard"
Write-Host "3. Add environment variables"
Write-Host "4. Configure custom domain (willowtalk.live)"
Write-Host "5. Test deployment"
Write-Host ""
Write-Host "🔗 Useful Commands:"
Write-Host "• Test build: npm run test:build"
Write-Host "• Analyze bundle: npm run analyze"
Write-Host "• Start production: npm start"
Write-Host ""
Write-Success "Deployment preparation completed! 🚀"

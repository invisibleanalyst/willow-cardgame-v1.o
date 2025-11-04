# Vercel Environment Variables Setup Script
# This script helps you add environment variables from .env.local to Vercel

Write-Host "🔐 Vercel Environment Variables Setup" -ForegroundColor Blue
Write-Host "=====================================" -ForegroundColor Blue
Write-Host ""

# Check if .env.local exists
if (-not (Test-Path ".env.local")) {
    Write-Host "❌ Error: .env.local file not found!" -ForegroundColor Red
    Write-Host "Please create .env.local with your environment variables first." -ForegroundColor Yellow
    exit 1
}

# Read environment variables from .env.local
$envVars = @()
Get-Content ".env.local" | ForEach-Object {
    $line = $_.Trim()
    # Skip comments and empty lines
    if ($line -and -not $line.StartsWith("#")) {
        $parts = $line -split '=', 2
        if ($parts.Count -eq 2) {
            $envVars += @{
                Name = $parts[0].Trim()
                Value = $parts[1].Trim()
            }
        }
    }
}

Write-Host "📋 Found $($envVars.Count) environment variables in .env.local" -ForegroundColor Green
Write-Host ""

# Critical variables that must be set
$criticalVars = @(
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
    "CLERK_SECRET_KEY"
)

# Show what will be added
Write-Host "🔍 Variables to be added to Vercel:" -ForegroundColor Cyan
Write-Host ""
foreach ($var in $envVars) {
    $isCritical = $criticalVars -contains $var.Name
    $marker = if ($isCritical) { "⚠️ " } else { "✓ " }
    $color = if ($isCritical) { "Yellow" } else { "White" }
    
    # Mask sensitive values
    $maskedValue = if ($var.Value.Length -gt 20) {
        $var.Value.Substring(0, 15) + "..."
    } else {
        "*" * $var.Value.Length
    }
    
    Write-Host "$marker $($var.Name) = $maskedValue" -ForegroundColor $color
}

Write-Host ""
Write-Host "⚠️  Variables marked with ⚠️  are CRITICAL for the app to work" -ForegroundColor Yellow
Write-Host ""

# Ask for confirmation
$confirm = Read-Host "Do you want to add these variables to Vercel? (y/n)"

if ($confirm -ne "y" -and $confirm -ne "Y") {
    Write-Host "❌ Cancelled." -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "🚀 Adding environment variables to Vercel..." -ForegroundColor Blue
Write-Host ""

$successCount = 0
$failCount = 0

foreach ($var in $envVars) {
    Write-Host "Adding $($var.Name)..." -NoNewline
    
    # Create a temporary file with the value
    $tempFile = New-TemporaryFile
    Set-Content -Path $tempFile.FullName -Value $var.Value -NoNewline
    
    try {
        # Add to production environment
        $output = Get-Content $tempFile.FullName | vercel env add $var.Name production 2>&1
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host " ✓" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host " ✗" -ForegroundColor Red
            $failCount++
        }
    }
    catch {
        Write-Host " ✗ (Error: $_)" -ForegroundColor Red
        $failCount++
    }
    finally {
        Remove-Item $tempFile.FullName -ErrorAction SilentlyContinue
    }
}

Write-Host ""
Write-Host "📊 Summary:" -ForegroundColor Cyan
Write-Host "  ✓ Success: $successCount" -ForegroundColor Green
Write-Host "  ✗ Failed: $failCount" -ForegroundColor Red
Write-Host ""

if ($failCount -eq 0) {
    Write-Host "✅ All environment variables added successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "🚀 Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: vercel --prod" -ForegroundColor White
    Write-Host "2. Wait for deployment to complete" -ForegroundColor White
    Write-Host "3. Visit your production URL" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "⚠️  Some variables failed to add." -ForegroundColor Yellow
    Write-Host "Please add them manually via Vercel dashboard:" -ForegroundColor Yellow
    Write-Host "https://vercel.com/invisibleanalysts-projects/willow-talk-edition/settings/environment-variables" -ForegroundColor Cyan
    Write-Host ""
}

Write-Host "📖 For more help, see VERCEL_ENV_SETUP.md" -ForegroundColor Blue




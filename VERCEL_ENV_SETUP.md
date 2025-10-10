# 🔐 Vercel Environment Variables Setup

## Quick Setup Guide

Your app is deployed to Vercel but needs environment variables to work properly.

### Method 1: Vercel Dashboard (Recommended - Easiest)

1. **Go to your project dashboard:**
   https://vercel.com/invisibleanalysts-projects/willow-talk-edition

2. **Navigate to Settings → Environment Variables**

3. **Add these variables** (copy from your `.env.local` file):

#### Required Variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=<your_value>
CLERK_SECRET_KEY=<your_value>
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/game
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/game

# Supabase (REQUIRED - build will fail without these)
NEXT_PUBLIC_SUPABASE_URL=<your_value>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your_value>
SUPABASE_SERVICE_ROLE_KEY=<your_value>

# OpenAI
OPENAI_API_KEY=<your_value>

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=<your_value>
PAYSTACK_SECRET_KEY=<your_value>

# App Configuration
NEXT_PUBLIC_APP_URL=https://willow-talk-edition.vercel.app
NEXT_PUBLIC_APP_NAME=Willow Talk Edition
```

4. **For each variable:**
   - Click "Add New"
   - Enter the **Name** (e.g., `NEXT_PUBLIC_SUPABASE_URL`)
   - Enter the **Value** (copy from your `.env.local`)
   - Select **All** environments (Production, Preview, Development)
   - Click "Save"

5. **After adding all variables:**
   - Go to "Deployments" tab
   - Click "Redeploy" on the latest deployment
   - Wait for build to complete (~2-3 minutes)

### Method 2: Vercel CLI (Alternative)

```powershell
# Add each variable one by one
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
vercel env add CLERK_SECRET_KEY production
vercel env add OPENAI_API_KEY production
vercel env add NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY production
vercel env add PAYSTACK_SECRET_KEY production

# Then redeploy
vercel --prod
```

## 📋 Checklist

- [ ] All environment variables added to Vercel
- [ ] Redeployed after adding variables
- [ ] Build completed successfully
- [ ] App loads at preview URL
- [ ] Authentication works
- [ ] Payment flow tested

## 🔗 Your Deployment URLs

- **Project Dashboard:** https://vercel.com/invisibleanalysts-projects/willow-talk-edition
- **Latest Preview:** https://willow-talk-edition-bqnui27z3-invisibleanalysts-projects.vercel.app
- **Production (after successful deploy):** https://willow-talk-edition.vercel.app

## ⚠️ Important Notes

1. **Supabase variables are CRITICAL** - build will fail without them
2. **Clerk variables** - needed for authentication
3. **Paystack variables** - needed for payments
4. **OpenAI variable** - needed for AI features

## 🚀 After Setup

Once environment variables are added and app is deployed:

1. Test the live URL
2. Verify authentication works
3. Test payment flow
4. Add custom domain `willowtalk.live` (optional)

---

**Need help?** Check the Vercel dashboard for detailed build logs and error messages.


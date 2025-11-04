# Willow Talk Edition - Production Deployment Guide

## 🚀 Quick Deployment Checklist

### Pre-Deployment Setup
- [ ] All environment variables configured
- [ ] GitHub repository created (`willow-talk-edition`)
- [ ] Vercel account set up
- [ ] Domain `willowtalk.live` purchased and configured

## 📋 Step-by-Step Deployment

### 1. GitHub Repository Setup

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial production-ready codebase for Willow Talk Edition"

# Create GitHub repository (via GitHub CLI or web interface)
gh repo create willow-talk-edition --public --description "Willow Talk Edition - Premium relationship connection platform"

# Push to GitHub
git remote add origin https://github.com/yourusername/willow-talk-edition.git
git branch -M main
git push -u origin main
```

### 2. Vercel Deployment

#### Connect Repository
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import `willow-talk-edition` repository
4. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next` (default)

#### Environment Variables
Add the following environment variables in Vercel Dashboard:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_your_key
CLERK_SECRET_KEY=sk_live_your_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/game
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/game

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# OpenAI
OPENAI_API_KEY=sk-your_openai_key

# Paystack (Production)
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_key
PAYSTACK_SECRET_KEY=sk_live_your_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://willowtalk.live
NEXT_PUBLIC_APP_NAME=Willow Talk Edition

# Developer Notifications
DEVELOPER_EMAIL=admin@willowtalk.live

# Email Service (Optional)
RESEND_API_KEY=re_your_key
```

### 3. Custom Domain Setup

#### DNS Configuration
Configure your domain registrar with these DNS records:

```
Type: A
Name: @
Value: 76.76.19.61

Type: AAAA
Name: @
Value: 2606:4700:3030::6815:4b3c

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

#### Vercel Domain Settings
1. Go to Project Settings → Domains
2. Add `willowtalk.live`
3. Add `www.willowtalk.live` (redirects to main domain)
4. Enable SSL (automatic)

### 4. Supabase Database Setup

Run the SQL schema in your Supabase SQL editor:

```sql
-- Copy and paste the contents of supabase-schema.sql
-- This creates all necessary tables for the application
```

### 5. Third-Party Service Configuration

#### Clerk Authentication
1. Create production Clerk application
2. Configure allowed origins: `https://willowtalk.live`
3. Set up OAuth providers (Google, Apple, etc.)

#### Paystack Integration
1. Switch to live mode in Paystack dashboard
2. Update webhook URL: `https://willowtalk.live/api/webhooks/paystack`
3. Test payment flow with real M-Pesa

#### OpenAI API
1. Ensure OpenAI API key has sufficient credits
2. Monitor usage in OpenAI dashboard

## 🔍 Post-Deployment Validation

### Domain & SSL
- [ ] Domain resolves correctly (`https://willowtalk.live`)
- [ ] SSL certificate is active (green lock icon)
- [ ] www redirects to main domain
- [ ] No mixed content warnings

### PWA Functionality
- [ ] PWA install prompt appears on mobile
- [ ] App works offline (test airplane mode)
- [ ] Service worker is registered
- [ ] Manifest.json loads correctly

### Authentication
- [ ] Sign up flow works
- [ ] Sign in flow works
- [ ] Protected routes redirect correctly
- [ ] User sessions persist

### Payment Integration
- [ ] KES 650 payment flow works
- [ ] VIP request form submits
- [ ] Paystack webhooks receive events
- [ ] Supabase records payment data

### Mobile Responsiveness
- [ ] iPhone SE (375px) - All elements visible
- [ ] Galaxy S20 (360px) - Touch targets adequate
- [ ] iPad (768px) - Layout adapts correctly
- [ ] Desktop (1920px) - Full functionality

### Performance Testing
- [ ] Lighthouse score > 90
- [ ] First Contentful Paint < 2s
- [ ] Largest Contentful Paint < 4s
- [ ] Cumulative Layout Shift < 0.1

### API Endpoints
- [ ] `/api/ai/sentiment` - AI analysis works
- [ ] `/api/payments/initialize` - Payment setup
- [ ] `/api/payments/verify` - Payment verification
- [ ] `/api/vip-request` - VIP form submission

## 🚨 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and rebuild
npm run clean
npm install
npm run build
```

#### Environment Variables
- Ensure all variables are set in Vercel dashboard
- Check variable names match exactly (case-sensitive)
- Verify no trailing spaces in values

#### Domain Issues
- Wait 24-48 hours for DNS propagation
- Check DNS records with `dig willowtalk.live`
- Clear browser cache and try incognito mode

#### PWA Issues
- Clear browser storage
- Check service worker in DevTools
- Verify manifest.json is accessible

## 📊 Monitoring & Analytics

### Performance Monitoring
- Vercel Analytics (built-in)
- Google PageSpeed Insights
- Lighthouse CI

### Error Tracking
- Vercel Functions logs
- Browser console errors
- API endpoint monitoring

### User Analytics
- Google Analytics (optional)
- Mixpanel (optional)
- Custom event tracking

## 🔄 Continuous Deployment

### Automatic Deployments
- Main branch → Production
- Pull requests → Preview deployments
- Branch protection rules enabled

### Deployment Process
1. Make changes in feature branch
2. Create pull request
3. Review and merge to main
4. Vercel automatically deploys
5. Test on production URL

## 📞 Support & Maintenance

### Regular Tasks
- [ ] Monitor error logs weekly
- [ ] Check payment webhooks
- [ ] Update dependencies monthly
- [ ] Backup Supabase data
- [ ] Review performance metrics

### Emergency Contacts
- Domain registrar support
- Vercel support
- Supabase support
- Paystack support

---

**Deployment completed successfully!** 🎉

Your Willow Talk Edition is now live at `https://willowtalk.live`



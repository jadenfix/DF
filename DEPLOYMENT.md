# 🚀 DreamForge Deployment Guide

## Environment Variables Status ✅

### Local Development (`.env.local`)
All environment variables have been updated and organized:

- ✅ **Database**: MongoDB URI (placeholder - update with real credentials)
- ✅ **AI Services**: Moondream + FAL.AI keys, Anthropic Claude key
- ✅ **Payments**: Stripe test keys (secret, publishable, webhook)
- ✅ **Authentication**: NextAuth secret, GitHub OAuth, Google OAuth
- ✅ **Security**: Admin secret for admin endpoints
- ✅ **Optional**: Redis URL for caching (localhost for dev)

### Production Environment (`.env.production`)
Template created for Vercel deployment with production URLs.

## 🔧 Deployment Steps

### 1. Install Vercel CLI
```bash
npm install -g vercel
vercel login
```

### 2. Set Environment Variables on Vercel
Run the automated setup script:
```bash
./setup-vercel-env.sh
```

Or set them manually via Vercel dashboard or CLI.

### 3. Update Production-Specific Values

#### ⚠️ Critical Updates Needed:
1. **NEXTAUTH_URL**: Update to your actual Vercel domain
   ```bash
   vercel env add NEXTAUTH_URL production
   # Enter: https://your-app-name.vercel.app
   ```

2. **MONGODB_URI**: Replace with your production MongoDB connection string
3. **OAuth Redirect URIs**: Update GitHub and Google OAuth settings with production URLs

#### 📱 OAuth Configuration:
- **GitHub OAuth**: Add `https://your-app-name.vercel.app/api/auth/callback/github`
- **Google OAuth**: Add `https://your-app-name.vercel.app/api/auth/callback/google`

### 4. Deploy to Vercel
```bash
# Link to Vercel project (first time)
vercel

# Deploy to production
vercel --prod
```

## 🔒 Security Checklist

- ✅ All sensitive keys are in environment variables (not hardcoded)
- ✅ `.env.local` and `.env.production` are gitignored
- ✅ NextAuth secret is cryptographically secure
- ✅ Admin endpoints protected with `ADMIN_SECRET`
- ❗ MongoDB credentials need to be updated for production
- ❗ Consider using production Stripe keys for live payments

## 📋 Environment Variables Reference

### Required for Core Functionality:
- `MOONDREAM_KEY` - AI image analysis
- `ANTHROPIC_API_KEY` - AI text generation (Claude Haiku)
- `NEXTAUTH_SECRET` - Session encryption
- `NEXTAUTH_URL` - Authentication callback URL

### Required for Full Features:
- `GITHUB_ID` + `GITHUB_SECRET` - GitHub OAuth
- `GOOGLE_CLIENT_ID` + `GOOGLE_CLIENT_SECRET` - Google OAuth
- `STRIPE_*` - Payment processing
- `MONGODB_URI` - Data persistence
- `ADMIN_SECRET` - Admin endpoints

### Optional:
- `REDIS_URL` - Caching and queues (recommended for production)

## 🧪 Testing After Deployment

1. **Core Features**:
   - ✅ Image upload and analysis (Playground)
   - ✅ Advanced features (Playground Advanced)
   - ✅ Authentication (GitHub + Google OAuth)
   - ✅ Status page and analytics

2. **API Endpoints**:
   - ✅ `/api/analyze` - Image analysis
   - ✅ `/api/generate` - Text generation
   - ✅ `/api/status` - Service status
   - ✅ `/api/analytics` - Usage metrics

3. **Mobile Responsiveness**:
   - ✅ Run mobile Playwright tests
   - ✅ Manual testing on devices

## 🐛 Troubleshooting

### Common Issues:
1. **OAuth not working**: Check redirect URIs match production domain
2. **API errors**: Verify all required environment variables are set
3. **Database connection**: Ensure MongoDB allows connections from Vercel IPs
4. **Build failures**: Check for any missing dependencies or TypeScript errors

### Debug Commands:
```bash
# Check environment variables
vercel env ls

# View deployment logs
vercel logs

# Local development with production env
vercel dev
```

## 📞 Support

If you encounter issues:
1. Check Vercel dashboard for deployment logs
2. Verify all environment variables are set correctly
3. Test API endpoints individually
4. Review NextAuth.js configuration for OAuth issues

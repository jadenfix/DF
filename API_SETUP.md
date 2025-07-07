# DreamForge API Setup Guide

This guide covers all the APIs and services you need to set up for DreamForge to work properly.

## 1. Environment Variables Setup

Create a `.env.local` file in your project root:

```bash
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dreamforge?retryWrites=true&w=majority

# Moondream AI (Official API)
FAL_KEY=your_fal_ai_key_here
MOONDREAM_KEY=your_moondream_api_key_here

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-api03-your_anthropic_key_here

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# NextAuth.js (for authentication)
NEXTAUTH_SECRET=your_nextauth_secret_here
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth (optional)
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

# Admin Secret (for admin endpoints)
ADMIN_SECRET=your_admin_secret_here

# Redis (optional, for caching and queues)
REDIS_URL=redis://localhost:6379
```

## 2. API Service Setup

### 2.1 MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free cluster
3. Create a database user with read/write permissions
4. Get your connection string
5. Add it to `MONGODB_URI`

### 2.2 Moondream AI (Official API)
1. Go to [Moondream Cloud Dashboard](https://moondream.ai/c/cloud/api-keys)
2. Sign up for an account
3. Get your API key from the dashboard
4. Add it to `MOONDREAM_KEY`

### 2.3 Anthropic Claude
1. Go to [Anthropic Console](https://console.anthropic.com/)
2. Create an account and get your API key
3. Add it to `ANTHROPIC_API_KEY`

### 2.4 Stripe
1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Create an account
3. Get your test keys from the Developers section
4. Add them to `STRIPE_SECRET_KEY` and `STRIPE_PUBLISHABLE_KEY`
5. Set up webhooks for payment events

### 2.5 GitHub OAuth (Optional)
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create a new OAuth App
3. Set callback URL to `http://localhost:3000/api/auth/callback/github`
4. Add credentials to environment variables

### 2.6 Google OAuth (Optional)
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add callback URL: `http://localhost:3000/api/auth/callback/google`

## 3. API Endpoints Overview

### Core APIs
- `POST /api/analyze` - Image analysis with Moondream/Claude
- `POST /api/feedback` - User feedback collection
- `GET /api/status` - System status check

### Admin APIs
- `GET /api/admin/reward-config` - Get current reward weights
- `PUT /api/admin/reward-config` - Update reward weights
- `POST /api/admin/reward-update` - Recompute reward scores

### Auth APIs
- `GET /api/auth/signin` - Sign in page
- `GET /api/auth/signout` - Sign out
- `POST /api/auth/callback/*` - OAuth callbacks

### Payment APIs
- `POST /api/stripe/checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

## 4. Testing Your APIs

### Test Image Analysis
```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "image": "data:image/jpeg;base64,/9j/4AAQ...",
    "prompt": "What do you see in this image?"
  }'
```

### Test Feedback
```bash
curl -X POST http://localhost:3000/api/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "analysisId": "507f1f77bcf86cd799439011",
    "feedback": "positive",
    "rewardScore": 5,
    "comment": "Great analysis!"
  }'
```

### Test Admin Endpoints
```bash
# Get current reward config
curl -X GET http://localhost:3000/api/admin/reward-config \
  -H "x-admin-secret: your_admin_secret"

# Update reward weights
curl -X PUT http://localhost:3000/api/admin/reward-config \
  -H "x-admin-secret: your_admin_secret" \
  -H "Content-Type: application/json" \
  -d '{
    "accuracy": 2.0,
    "helpfulness": 1.0,
    "latency": -0.01
  }'
```

## 5. Development vs Production

### Development
- Use `.env.local` for local development
- MongoDB Atlas free tier is sufficient
- Stripe test keys for payment testing
- Mock responses when APIs are not configured

### Production
- Use Vercel environment variables
- MongoDB Atlas paid tier for better performance
- Stripe live keys for real payments
- All APIs must be properly configured

## 6. Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check your connection string
   - Ensure IP whitelist includes your IP
   - Verify database user permissions

2. **Moondream API Unauthorized**
   - Verify your FAL.AI API key
   - Check if you have sufficient credits
   - The app will fall back to mock responses

3. **Stripe Webhook Errors**
   - Verify webhook secret
   - Check webhook endpoint URL
   - Ensure proper event handling

4. **NextAuth Configuration**
   - Verify OAuth app settings
   - Check callback URLs
   - Ensure environment variables are set

### Debug Mode
Add `DEBUG=true` to your environment variables to see detailed logs.

## 7. Security Considerations

1. **Never commit API keys** to version control
2. **Use environment variables** for all secrets
3. **Validate all inputs** in API routes
4. **Rate limit** public endpoints
5. **Monitor usage** to prevent abuse

## 8. Performance Optimization

1. **Enable caching** for frequently accessed data
2. **Use CDN** for static assets
3. **Optimize images** before processing
4. **Implement connection pooling** for MongoDB
5. **Monitor API response times**

## 9. Deployment Checklist

- [ ] All environment variables set in Vercel
- [ ] MongoDB Atlas configured
- [ ] Stripe webhooks configured
- [ ] OAuth apps configured for production URLs
- [ ] Admin secret set
- [ ] API keys configured
- [ ] Domain configured in OAuth apps
- [ ] SSL certificates valid
- [ ] Monitoring and alerts set up

## 10. Cost Estimation

### Free Tier (Development)
- MongoDB Atlas: Free (512MB)
- FAL.AI: Free tier available
- Stripe: No charges for test mode
- Vercel: Free tier available

### Production Costs
- MongoDB Atlas: $9/month (2GB)
- FAL.AI: Pay per request (~$0.01-0.05 per image)
- Anthropic Claude: Pay per token (~$0.01-0.03 per request)
- Stripe: 2.9% + 30¢ per transaction
- Vercel: $20/month (Pro plan)

Total estimated cost: $50-200/month depending on usage. 
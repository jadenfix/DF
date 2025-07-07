#!/bin/bash

echo "🚀 DreamForge Setup Script"
echo "=========================="

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dreamforge?retryWrites=true&w=majority

# Moondream AI (via FAL.AI)
FAL_KEY=your_fal_ai_key_here
MOONDREAM_KEY=your_fal_ai_key_here

# Anthropic Claude
ANTHROPIC_API_KEY=sk-ant-api03-your_anthropic_key_here

# Stripe (for payments)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# NextAuth.js (for authentication)
NEXTAUTH_SECRET=$(openssl rand -base64 32)
NEXTAUTH_URL=http://localhost:3000

# GitHub OAuth (optional)
GITHUB_ID=your_github_oauth_app_id
GITHUB_SECRET=your_github_oauth_app_secret

# Google OAuth (optional)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

# Admin Secret (for admin endpoints)
ADMIN_SECRET=admin-secret-$(openssl rand -hex 8)

# Redis (optional, for caching and queues)
REDIS_URL=redis://localhost:6379
EOF
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if MongoDB is running locally (optional)
if command -v mongod &> /dev/null; then
    echo "🔍 Checking MongoDB..."
    if pgrep -x "mongod" > /dev/null; then
        echo "✅ MongoDB is running"
    else
        echo "⚠️  MongoDB is not running (optional for development)"
    fi
else
    echo "ℹ️  MongoDB not installed locally (using Atlas recommended)"
fi

# Create necessary directories
echo "📁 Creating necessary directories..."
mkdir -p app/api/admin
mkdir -p app/api/stripe
mkdir -p app/api/auth

# Generate NextAuth secret if not set
if ! grep -q "NEXTAUTH_SECRET=" .env.local || grep -q "your_nextauth_secret_here" .env.local; then
    echo "🔐 Generating NextAuth secret..."
    NEXTAUTH_SECRET=$(openssl rand -base64 32)
    sed -i '' "s/your_nextauth_secret_here/$NEXTAUTH_SECRET/" .env.local
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your actual API keys"
echo "2. Run 'npm run dev' to start development server"
echo "3. Visit http://localhost:3000 to see your app"
echo ""
echo "Required API keys to get:"
echo "- MongoDB Atlas (free tier available)"
echo "- FAL.AI (for Moondream)"
echo "- Anthropic Claude (optional)"
echo "- Stripe (for payments)"
echo "- GitHub/Google OAuth (optional)"
echo ""
echo "See API_SETUP.md for detailed instructions!" 
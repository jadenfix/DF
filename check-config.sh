#!/bin/bash

# API Configuration Check Script for DreamForge
echo "🔍 DreamForge API Configuration Check"
echo "======================================="

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found"
    echo "💡 Copy from API_SETUP.md or create one with required variables"
    exit 1
fi

echo "✅ .env.local file found"
echo ""

# Check for required environment variables
echo "🔑 Checking API Keys:"
echo "--------------------"

# Moondream API Key
if grep -q "MOONDREAM_KEY=your_moondream_api_key_here" .env.local || ! grep -q "MOONDREAM_KEY=" .env.local; then
    echo "❌ MOONDREAM_KEY not configured"
    echo "   Get your key from: https://moondream.ai/c/cloud/api-keys"
else
    echo "✅ MOONDREAM_KEY configured"
fi

# Anthropic API Key  
if grep -q "ANTHROPIC_API_KEY=sk-ant-api03-your_anthropic_key_here" .env.local || ! grep -q "ANTHROPIC_API_KEY=" .env.local; then
    echo "❌ ANTHROPIC_API_KEY not configured"
    echo "   Get your key from: https://console.anthropic.com/"
else
    echo "✅ ANTHROPIC_API_KEY configured"
fi

# MongoDB URI
if grep -q "MONGODB_URI=mongodb+srv://username:password" .env.local || ! grep -q "MONGODB_URI=" .env.local; then
    echo "❌ MONGODB_URI not configured"
    echo "   Set up MongoDB Atlas: https://cloud.mongodb.com/"
else
    echo "✅ MONGODB_URI configured"
fi

echo ""
echo "📚 Optional Configuration:"
echo "-------------------------"

# Stripe
if grep -q "STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key" .env.local; then
    echo "⚠️  STRIPE_SECRET_KEY using placeholder (optional for payments)"
else
    echo "✅ STRIPE_SECRET_KEY configured"
fi

# NextAuth Secret
if grep -q "NEXTAUTH_SECRET=" .env.local; then
    echo "✅ NEXTAUTH_SECRET configured"
else
    echo "❌ NEXTAUTH_SECRET not configured"
fi

echo ""
echo "🧪 Running Quick Tests:"
echo "----------------------"

# Test the status endpoint
echo "Testing status endpoint..."
if command -v curl >/dev/null 2>&1; then
    if curl -s http://localhost:3000/api/status >/dev/null 2>&1; then
        echo "✅ Status endpoint responding"
    else
        echo "⚠️  Server not running (try: npm run dev)"
    fi
else
    echo "⚠️  curl not available for testing"
fi

echo ""
echo "🎯 Next Steps:"
echo "-------------"
if grep -q "MOONDREAM_KEY=your_moondream_api_key_here" .env.local; then
    echo "1. Add your Moondream API key to .env.local"
    echo "2. Restart the development server: npm run dev"
    echo "3. Test image analysis in the playground"
else
    echo "✅ All required keys configured!"
    echo "🚀 Ready to run: npm run dev"
fi

echo ""
echo "📖 For detailed setup instructions, see: API_SETUP.md"

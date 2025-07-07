#!/bin/bash

# =======================================================
# DreamForge Environment Variables Validation Script
# =======================================================

echo "🔍 Validating DreamForge environment variables..."
echo ""

# Load environment variables
if [ -f .env.local ]; then
    source .env.local
else
    echo "❌ .env.local file not found!"
    exit 1
fi

# Function to check if variable is set and not empty
check_var() {
    local var_name=$1
    local var_value=${!var_name}
    local is_required=$2
    
    if [ -z "$var_value" ] || [ "$var_value" = "your_*" ] || [ "$var_value" = "sk-ant-api03-your_*" ]; then
        if [ "$is_required" = "required" ]; then
            echo "❌ $var_name: NOT SET or placeholder value"
            return 1
        else
            echo "⚠️  $var_name: NOT SET (optional)"
            return 0
        fi
    else
        echo "✅ $var_name: SET"
        return 0
    fi
}

errors=0

echo "📋 Required Variables:"
check_var "MOONDREAM_KEY" "required" || ((errors++))
check_var "ANTHROPIC_API_KEY" "required" || ((errors++))
check_var "NEXTAUTH_SECRET" "required" || ((errors++))
check_var "NEXTAUTH_URL" "required" || ((errors++))

echo ""
echo "🔐 Authentication Variables:"
check_var "GITHUB_ID" "required" || ((errors++))
check_var "GITHUB_SECRET" "required" || ((errors++))
check_var "GOOGLE_CLIENT_ID" "required" || ((errors++))
check_var "GOOGLE_CLIENT_SECRET" "required" || ((errors++))

echo ""
echo "💳 Payment Variables:"
check_var "STRIPE_SECRET_KEY" "optional"
check_var "STRIPE_PUBLISHABLE_KEY" "optional"
check_var "STRIPE_WEBHOOK_SECRET" "optional"

echo ""
echo "🗄️  Database & Optional:"
check_var "MONGODB_URI" "optional"
check_var "ADMIN_SECRET" "optional"
check_var "REDIS_URL" "optional"

echo ""
echo "=================================="
if [ $errors -eq 0 ]; then
    echo "✅ All required environment variables are set!"
    echo "🚀 Ready for development and deployment."
else
    echo "❌ $errors required environment variable(s) missing!"
    echo "📝 Please update your .env.local file."
    exit 1
fi
echo "=================================="

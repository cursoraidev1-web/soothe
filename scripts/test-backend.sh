#!/bin/bash

# Backend Connection Test Script
# Usage: ./scripts/test-backend.sh

echo "🔍 Testing Backend Connection..."
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
BACKEND_URL="${NEXT_PUBLIC_API_URL:-http://localhost:3000/api/v1}"
BASE_URL=$(echo $BACKEND_URL | sed 's|/api/v1||')

echo "📍 Backend URL: $BACKEND_URL"
echo "📍 Base URL: $BASE_URL"
echo ""

# Test 1: Check if backend is running
echo "Test 1: Checking if backend is running..."
if curl -s -f -o /dev/null "$BASE_URL/api/v1"; then
    echo -e "${GREEN}✅ Backend is running${NC}"
else
    echo -e "${RED}❌ Backend is not responding${NC}"
    echo ""
    echo "💡 To start the backend:"
    echo "   cd backend"
    echo "   npm run start:dev"
    exit 1
fi
echo ""

# Test 2: Get all blog posts
echo "Test 2: Fetching blog posts..."
BLOG_RESPONSE=$(curl -s "$BACKEND_URL/blog")
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Blog posts endpoint working${NC}"
    echo "Response preview:"
    echo "$BLOG_RESPONSE" | head -20
    
    # Extract first slug if available
    FIRST_SLUG=$(echo "$BLOG_RESPONSE" | grep -o '"slug":"[^"]*"' | head -1 | cut -d'"' -f4)
    if [ ! -z "$FIRST_SLUG" ]; then
        echo ""
        echo "📝 Found blog post with slug: $FIRST_SLUG"
        
        # Test 3: Get specific blog post
        echo ""
        echo "Test 3: Fetching specific blog post..."
        POST_RESPONSE=$(curl -s "$BACKEND_URL/blog/$FIRST_SLUG")
        if [ $? -eq 0 ] && [[ "$POST_RESPONSE" != *"\"statusCode\":404"* ]]; then
            echo -e "${GREEN}✅ Blog post detail endpoint working${NC}"
            echo "Response preview:"
            echo "$POST_RESPONSE" | head -30
        else
            echo -e "${RED}❌ Blog post detail endpoint failed${NC}"
            echo "Response:"
            echo "$POST_RESPONSE"
        fi
    else
        echo ""
        echo -e "${YELLOW}⚠️  No blog posts found in database${NC}"
        echo ""
        echo "💡 To create blog posts:"
        echo "   1. Login to admin panel: http://localhost:3002"
        echo "   2. Go to Blog section"
        echo "   3. Create a new post"
        echo "   4. Set status to PUBLISHED"
    fi
else
    echo -e "${RED}❌ Blog posts endpoint failed${NC}"
fi
echo ""

# Test 4: Check other endpoints
echo "Test 4: Checking other endpoints..."
ENDPOINTS=("solutions" "careers" "team" "settings")
for endpoint in "${ENDPOINTS[@]}"; do
    if curl -s -f -o /dev/null "$BACKEND_URL/$endpoint"; then
        echo -e "${GREEN}✅ /$endpoint${NC}"
    else
        echo -e "${RED}❌ /$endpoint${NC}"
    fi
done
echo ""

# Summary
echo "================================================"
echo "✨ Backend Connection Test Complete"
echo "================================================"
echo ""
echo "Next steps:"
echo "1. If tests failed, ensure backend is running:"
echo "   cd backend && npm run start:dev"
echo ""
echo "2. Update your .env.local file:"
echo "   NEXT_PUBLIC_API_URL=$BACKEND_URL"
echo ""
echo "3. Restart frontend:"
echo "   npm run dev"
echo ""
echo "4. Visit frontend:"
echo "   http://localhost:3001/blog"

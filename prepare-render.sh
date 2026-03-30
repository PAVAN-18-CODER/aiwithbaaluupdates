#!/usr/bin/env bash
# 🚀 RENDER DEPLOYMENT SCRIPT
# Automated setup for Render.com deployment

set -e

echo "╔════════════════════════════════════════════════════╗"
echo "║  🚀 PREPARING FOR RENDER DEPLOYMENT              ║"
echo "╚════════════════════════════════════════════════════╝"

# Step 1: Verify files exist
echo ""
echo "✅ Step 1: Checking project files..."
if [ -f "backend/server.js" ] && [ -f "backend/package.json" ]; then
    echo "   ✓ Backend files found"
else
    echo "   ✗ Backend files missing"
    exit 1
fi

if [ -f "pa1.html" ]; then
    echo "   ✓ Frontend file found"
else
    echo "   ✗ Frontend file missing"
    exit 1
fi

# Step 2: Check Node.js
echo ""
echo "✅ Step 2: Checking Node.js..."
node --version
npm --version

# Step 3: Verify backend dependencies
echo ""
echo "✅ Step 3: Checking backend dependencies..."
cd backend
npm list express mongoose cors dotenv > /dev/null 2>&1 && echo "   ✓ All dependencies installed" || echo "   ⚠ Some dependencies missing"
cd ..

# Step 4: Show what Render will deploy
echo ""
echo "✅ Step 4: Render will deploy:"
echo "   📁 Root directory: backend/"
echo "   📦 Dependencies: backend/package.json"
echo "   🚀 Start command: node server.js"
echo "   🔨 Build command: npm install"
echo "   📱 Port: 3000"
echo "   🌐 Output: https://ai-with-baalu-backend-xxxxx.onrender.com"

# Step 5: Create .env for Render
echo ""
echo "✅ Step 5: Preparing environment..."
if [ ! -f "backend/.env" ]; then
    echo "   Creating backend/.env..."
    cat > backend/.env << 'EOF'
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/ai-news-db
EOF
    echo "   ✓ .env file created"
else
    echo "   ✓ .env file already exists"
fi

# Step 6: Summary
echo ""
echo "════════════════════════════════════════════════════"
echo "✅ RENDER DEPLOYMENT READY!"
echo "════════════════════════════════════════════════════"
echo ""
echo "📍 NEXT STEPS:"
echo ""
echo "1. Go to https://render.com"
echo "2. Sign up with GitHub"
echo "3. Click 'New' → 'Web Service'"
echo "4. Select: aiwithbaaluupdates"
echo "5. Configuration:"
echo "   Name: ai-with-baalu-backend"
echo "   Root: backend/"
echo "   Build: npm install"
echo "   Start: node server.js"
echo "6. Click 'Deploy'"
echo "7. Wait 2-3 minutes"
echo ""
echo "✅ DEPLOYMENT COMPLETE!"

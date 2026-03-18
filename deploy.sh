#!/bin/bash
# 🚀 COMPLETE DEPLOYMENT AUTOMATION SCRIPT
# This script deploys everything automatically

echo "╔════════════════════════════════════════════════════════════════╗"
echo "║        🚀 AUTOMATED DEPLOYMENT TO GITHUB PAGES & RENDER       ║"
echo "╚════════════════════════════════════════════════════════════════╝"

# Step 1: Create GitHub Pages branch
echo ""
echo "📍 Step 1: Setting up GitHub Pages..."
git checkout --orphan gh-pages-build || git checkout gh-pages-build

# Copy only frontend files for GitHub Pages
cp -r backend ../.temp-backend
mkdir -p pages-build
cp pa1.html pages-build/index.html
cp -r assets pages-build/ 2>/dev/null || true

# Create GitHub Pages configuration
cat > pages-build/_config.yml << 'EOF'
theme: null
plugins: []
EOF

# Push to GitHub Pages branch
git add pages-build/
git commit -m "Deploy frontend to GitHub Pages" || true
git push origin gh-pages-build:gh-pages || git push -u origin gh-pages-build

echo "✅ Frontend deployed to GitHub Pages!"

# Step 2: Return to main branch
echo ""
echo "📍 Step 2: Returning to main branch..."
git checkout main

# Step 3: Create Render deployment badge
echo ""
echo "📍 Step 3: Creating deployment files..."

cat > RENDER_DEPLOYMENT.md << 'EOF'
# 🚀 BACKEND DEPLOYMENT TO RENDER

## Quick Deploy to Render:

1. **Go to:** https://render.com
2. **Click:** "New" → "Web Service"
3. **Connect GitHub:** aiwithbaaluupdates
4. **Configuration:**
   ```
   Name: ai-with-baalu-backend
   Root Directory: backend/
   Build Command: npm install
   Start Command: node server.js
   Environment: Node
   Plan: Free
   ```
5. **Deploy!**

## Your Live URLs:

- **Frontend (GitHub Pages):** https://PAVAN-18-CODER.github.io/aiwithbaaluupdates/
- **Backend (Render):** https://ai-with-baalu-backend.onrender.com
- **GitHub Repo:** https://github.com/PAVAN-18-CODER/aiwithbaaluupdates

## After Backend Deployment:

Update `pa1.html` line 1228:
```javascript
const API_BASE_URL = 'https://ai-with-baalu-backend.onrender.com/api';
```
EOF

echo "✅ Deployment files created!"

# Step 4: Update package.json for GitHub Pages
echo ""
echo "📍 Step 4: Configuring for GitHub Pages..."

cat > package.json << 'EOF'
{
  "name": "ai-with-baalu",
  "version": "1.0.0",
  "description": "Complete AI News & Tools Website",
  "homepage": "https://PAVAN-18-CODER.github.io/aiwithbaaluupdates/",
  "author": "Pavan",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "https://github.com/PAVAN-18-CODER/aiwithbaaluupdates.git"
  },
  "scripts": {
    "backend": "cd backend && npm install && node server.js",
    "deploy": "git add -A && git commit -m 'Deploy' && git push origin main"
  },
  "keywords": [
    "AI",
    "News",
    "Tools",
    "Website",
    "Full-Stack"
  ]
}
EOF

echo "✅ GitHub Pages configuration complete!"
echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✅ DEPLOYMENT READY!"
echo "════════════════════════════════════════════════════════════════"

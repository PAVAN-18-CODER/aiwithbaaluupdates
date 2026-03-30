#!/bin/bash

# ====================================
# 🚀 AI WITH BAALU - AUTO DEPLOYMENT
# ====================================
# This script automates the entire deployment process

set -e

echo "╔════════════════════════════════════════════════════════════╗"
echo "║      🚀 AI WITH BAALU - AUTOMATED DEPLOYMENT SCRIPT        ║"
echo "╚════════════════════════════════════════════════════════════╝"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

GITHUB_REPO="PAVAN-18-CODER/aiwithbaaluupdates"
GITHUB_PAGES_URL="https://PAVAN-18-CODER.github.io/aiwithbaaluupdates/"
RENDER_URL="https://ai-with-baalu-backend.onrender.com"

echo -e "${BLUE}[1/5]${NC} Checking prerequisites..."
if ! command -v git &> /dev/null; then
    echo -e "${RED}❌ Git is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Git found${NC}"

echo ""
echo -e "${BLUE}[2/5]${NC} Verifying repository status..."
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}⚠️  Initializing git...${NC}"
    git init
    git remote add origin "https://github.com/$GITHUB_REPO.git"
fi
echo -e "${GREEN}✅ Repository ready${NC}"

echo ""
echo -e "${BLUE}[3/5]${NC} Staging changes..."
git add -A
CHANGES=$(git status --short)
if [ -n "$CHANGES" ]; then
    echo -e "${GREEN}✅ Staged:${NC}"
    echo "$CHANGES" | sed 's/^/   /'
else
    echo -e "${YELLOW}⚠️  No changes${NC}"
fi

echo ""
echo -e "${BLUE}[4/5]${NC} Committing..."
if [ -n "$CHANGES" ]; then
    TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
    git commit -m "🚀 Auto-deployment: $TIMESTAMP"
    echo -e "${GREEN}✅ Committed${NC}"
fi

echo ""
echo -e "${BLUE}[5/5]${NC} Pushing..."
git push origin main
echo -e "${GREEN}✅ Pushed to GitHub${NC}"

echo ""
echo "╔════════════════════════════════════════════════════════════╗"
echo "║                   ✅ READY TO DEPLOY!                      ║"
echo "╚════════════════════════════════════════════════════════════╝"
echo ""
echo -e "${YELLOW}📍 FRONTEND (GitHub Pages)${NC}"
echo "   URL: $GITHUB_PAGES_URL"
echo "   Status: Updates automatically when you push"
echo ""
echo -e "${YELLOW}📍 BACKEND (Render.com)${NC}"
echo "   URL: $RENDER_URL/api"
echo "   Action: Deploy now at https://render.com/dashboard"
echo ""

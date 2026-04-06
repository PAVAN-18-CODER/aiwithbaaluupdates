@echo off
echo ========================================
echo   AI with Baalu - Deployment Script
echo ========================================
echo.

cd /d "%~dp0"

echo [1/5] Checking Git status...
git status
echo.

echo [2/5] Adding all changes...
git add .
echo.

echo [3/5] Committing changes...
set /p commit_msg="Enter commit message (or press Enter for default): "
if "%commit_msg%"=="" set commit_msg=Updated AI with Baalu website

git commit -m "%commit_msg%"
echo.

echo [4/5] Pushing to GitHub...
git push origin main
echo.

echo [5/5] Deployment initiated!
echo.
echo ========================================
echo   Deployment Status
echo ========================================
echo.
echo ✅ Code pushed to GitHub successfully!
echo.
echo 🌐 Your website will be live in 2-3 minutes at:
echo    https://PAVAN-18-CODER.github.io/aiwithbaaluupdates/
echo.
echo 📊 Check deployment status:
echo    https://github.com/PAVAN-18-CODER/aiwithbaaluupdates/actions
echo.
echo ========================================
echo.
pause

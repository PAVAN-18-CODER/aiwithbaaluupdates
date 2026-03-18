@echo off
REM AI with Baalu - Backend Setup Script for Windows

echo.
echo ================================
echo AI with Baalu - Backend Setup
echo ================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js is installed

echo.
echo [2/4] Installing npm dependencies...
echo This may take a few minutes...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed

echo.
echo [3/4] Checking MongoDB connection...
echo Make sure MongoDB is running locally or update .env with MongoDB Atlas URI
timeout /t 2 >nul

echo.
echo [4/4] Seeding database with sample data...
call node seed.js
if errorlevel 1 (
    echo WARNING: Failed to seed database
    echo This might be due to MongoDB not running
    echo Please ensure MongoDB is running and try again with: node seed.js
    pause
    exit /b 1
)
echo ✓ Database seeded successfully

echo.
echo ================================
echo ✓ Setup Complete!
echo ================================
echo.
echo Next steps:
echo 1. Make sure MongoDB is running
echo 2. Run: npm run dev
echo 3. Backend will be available at: http://localhost:3000
echo 4. API endpoints ready for frontend
echo.
pause

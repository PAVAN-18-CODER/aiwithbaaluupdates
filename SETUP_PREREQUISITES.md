# PRE-SETUP REQUIREMENTS

Before running `setup.bat`, you MUST complete these steps:

## ✅ Step 1: Install Node.js (Required)

1. Download Node.js from: https://nodejs.org/
2. Choose the **LTS (Long Term Support)** version
3. Run the installer and follow the prompts
4. Accept all defaults
5. Restart your computer or terminal

**Verify installation:**
```
node --version
npm --version
```

---

## ✅ Step 2: Setup MongoDB Connection

Choose ONE option:

### Option A: Local MongoDB (Recommended for Development)

1. Download MongoDB Community from: https://www.mongodb.com/try/download/community
2. Install with default settings
3. Start MongoDB:
   - **Windows**: Open Command Prompt and run `mongod`
   - MongoDB will run on `mongodb://localhost:27017`

4. Verify it's running by checking: http://localhost:27017/
   (You should see some JSON output)

### Option B: MongoDB Atlas (Cloud - Free Tier Available)

1. Go to: https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a new database cluster (free tier)
4. Get your connection string
5. Copy your connection string to `.env` file:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-news-db
   ```

---

## ✅ Step 3: Run Setup Script

Once Node.js and MongoDB are ready:

**Windows:**
```
Double-click: setup.bat
```

Or in Command Prompt:
```
cd backend
setup.bat
```

---

## ✅ What Happens During Setup

1. ✓ Verifies Node.js is installed
2. ✓ Installs all npm packages (express, mongoose, cors, etc.)
3. ✓ Checks MongoDB connection
4. ✓ Seeds database with 6 news articles and 6 AI tools

---

## 🚀 After Setup

Once setup completes, start the backend server:

```
npm run dev
```

Expected output:
```
🚀 Server running on http://localhost:3000
📚 API Documentation:
   - GET /api/news - Get all news
   - GET /api/tools - Get all tools
   - GET /api/health - Health check
```

---

## ⚠️ Troubleshooting

**"Node.js is not recognized"**
- Restart your terminal after installing Node.js
- Make sure you installed Node.js properly

**"Cannot connect to MongoDB"**
- Windows: Run `mongod` in a separate Command Prompt
- Make sure MongoDB is running before seeding

**"Port 3000 already in use"**
- Edit `.env` and change PORT to 3001 or 3002

---

**Need help?** Check BACKEND_SETUP.md for detailed API documentation

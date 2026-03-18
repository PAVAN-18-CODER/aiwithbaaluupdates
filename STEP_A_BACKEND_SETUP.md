# ✅ STEP A: Backend Setup & Testing - Complete Guide

## 📋 What You Need to Do

Before the backend can run, complete these **ONE-TIME** setup steps:

---

## 🔧 STEP 1: Install Node.js (10 minutes)

1. Go to: https://nodejs.org/
2. Download **LTS version** (Long Term Support)
3. Install with default settings
4. **IMPORTANT: Restart your terminal/command prompt after installation**

**Verify it worked:**
```
node --version
npm --version
```

Should show version numbers, not errors.

---

## 🗄️ STEP 2: Setup MongoDB (Choose One Option)

### Option A: Local MongoDB (Easiest for Development)
1. Go to: https://www.mongodb.com/try/download/community
2. Download for Windows
3. Install with default settings
4. **To start MongoDB**, open Command Prompt and run:
   ```
   mongod
   ```
5. Leave it running in the background

### Option B: MongoDB Atlas Cloud (Recommended for Production)
1. Go to: https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster (free tier)
4. Get your connection string
5. Open `backend/.env` and replace the MONGODB_URI with your connection string

---

## 🚀 STEP 3: Automated Backend Setup

Navigate to the `backend` folder and run the setup script:

### Windows:
```
Double-click: setup.bat
```

**OR** in Command Prompt:
```
cd backend
setup.bat
```

### What the script does:
1. ✓ Installs npm packages
2. ✓ Tests MongoDB connection
3. ✓ Seeds database with 6 news articles + 6 AI tools
4. ✓ Displays API endpoints

**Expected output:**
```
✓ Dependencies installed
✓ Database seeded successfully
✅ Setup Complete!
```

---

## 🎯 STEP 4: Start the Backend Server

After setup completes, run:

```
npm run dev
```

**Expected output:**
```
🚀 Server running on http://localhost:3000
📚 API Documentation:
   - GET /api/news - Get all news
   - GET /api/tools - Get all tools
   - GET /api/health - Health check
```

**Keep this terminal open!** The server needs to stay running.

---

## ✅ STEP 5: Test the Backend (In New Terminal/Browser)

Open a NEW terminal or browser and test these endpoints:

### Browser Test (Easiest)
Paste these into your browser address bar:

1. **Health Check:**
   ```
   http://localhost:3000/api/health
   ```
   Should show: `{"status":"Backend is running",...}`

2. **Get All News:**
   ```
   http://localhost:3000/api/news
   ```
   Should return array of 6 news articles

3. **Get All Tools:**
   ```
   http://localhost:3000/api/tools
   ```
   Should return array of 6 AI tools

### Using Postman (Professional)
1. Download: https://www.postman.com/downloads/
2. Open Postman
3. Import: File → Import → Select `postman-collection.json`
4. Run requests from the collection

See **API_TESTING_GUIDE.md** for detailed testing instructions.

---

## 🔗 STEP 6: Verify Frontend Connection

1. Open `pa1.html` in your browser
2. Press F12 to open Developer Console
3. Should show one of:
   - ✅ "Connected to backend" (if backend is running)
   - 📡 "Backend not connected - using sample data" (if backend is down)

**Frontend automatically works with or without backend!**

---

## 📊 Project Architecture

```
Full Stack
├── backend/                (Node.js Server)
│   ├── models/
│   │   ├── News.js        (Article schema)
│   │   └── Tool.js        (Tool schema)
│   ├── routes/
│   │   ├── news.js        (News endpoints)
│   │   └── tools.js       (Tools endpoints)
│   ├── server.js          (Express server)
│   ├── seed.js            (Database seeding)
│   ├── setup.bat          (Automated setup)
│   └── .env               (Configuration)
│
├── pa1.html               (Frontend - Always works!)
│
└── Documentation
    ├── SETUP_PREREQUISITES.md
    ├── API_TESTING_GUIDE.md
    ├── postman-collection.json
    └── This file
```

---

## 🟢 Status Checklist

- [ ] Node.js installed (check with `node --version`)
- [ ] MongoDB setup (running locally or Atlas)
- [ ] `npm install` completed in backend folder
- [ ] `setup.bat` ran successfully
- [ ] `npm run dev` running (backend server started)
- [ ] Tested `/api/health` endpoint
- [ ] Frontend loads with backend data

Once all items are checked ✓, you've completed **STEP A**!

---

## 🥁 PORT REFERENCE

Make sure these ports are available:
- **3000**: Backend API (can change in `.env`)
- **27017**: MongoDB local (if using local DB)

If port 3000 is in use, edit `backend/.env` and change:
```
PORT=3001
```

---

## 📝 Files We Created for You

1. **setup.bat** - Automated setup script
2. **SETUP_PREREQUISITES.md** - Detailed pre-setup guide
3. **.env.example** - Environment variable reference
4. **API_TESTING_GUIDE.md** - Complete testing documentation
5. **postman-collection.json** - Postman API testing collection

---

## ❌ Common Issues & Solutions

### "Node is not recognized"
- Restart Command Prompt after installing Node.js
- Or add Node to system PATH

### "Cannot connect to MongoDB"
- Make sure `mongod` is running in another terminal
- Or use MongoDB Atlas connection string in `.env`

### "Port 3000 already in use"
- Change PORT in `.env` to 3001 or 3002
- Or kill process using port 3000

### "Setup script won't run"
- Make sure you're in the backend folder: `cd backend`
- Try right-click → Run as Administrator

---

## 🎉 Next: STEP B - Enhance Frontend Features

Once backend is tested and working, move to **STEP B**:
- Connect frontend API calls to real backend data
- Add Instagram feed integration
- Implement advanced filtering
- Optimize animations

See **Step B instructions** for details.

---

## 📞 Need Help?

1. Check troubleshooting section above
2. Read API_TESTING_GUIDE.md
3. Verify terminal shows "🚀 Server running"
4. Try testing with browser first (easiest)

**Backend is fully functional once you see the success messages!**

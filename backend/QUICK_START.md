# Quick Start - Backend & Frontend Connection

Get your AI with Baalu backend running in 5 minutes!

## Step-by-Step Quick Start

### Step 1: Install Node.js Dependencies (2 min)

```bash
cd backend
npm install
```

### Step 2: Ensure MongoDB is Running

**Windows:**
```bash
mongod
```

**Mac:**
```bash
brew services start mongodb-community
```

**Linux:**
```bash
sudo systemctl start mongod
```

Or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (cloud) and update `.env`.

### Step 3: Seed Sample Data (1 min)

```bash
node seed.js
```

Expected output:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Inserted 6 news articles
✅ Inserted 6 tools
🎉 Database seeded successfully!
```

### Step 4: Start the Backend Server (1 min)

```bash
npm run dev
```

Expected output:
```
🚀 Server running on http://localhost:3000
```

### Step 5: Test the Backend (1 min)

Open your browser and visit:
- **Health Check**: `http://localhost:3000/api/health`
- **All News**: `http://localhost:3000/api/news`
- **All Tools**: `http://localhost:3000/api/tools`

You should see JSON responses!

### Step 6: View Frontend with Backend Data

1. Open `pa1.html` in your browser
2. Look for the notification: "✅ Connected to backend"
3. Browse the news and tools - they're now coming from your backend!

## What Just Happened?

✅ Backend API server is running on port 3000
✅ MongoDB database has sample data
✅ Frontend is fetching real data from the backend
✅ Full integration is complete!

## Next Steps

### Add More News
```bash
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -d '{
    "emoji": "🚀",
    "title": "My AI News",
    "excerpt": "Short summary",
    "fullContent": "Full details here",
    "category": "LLM"
  }'
```

### View Database
```bash
mongosh
use ai-news-db
db.news.find().pretty()
```

### Modify API
Edit files in `backend/routes/` to customize endpoints.

## Troubleshooting

| Error | Solution |
|-------|----------|
| `ECONNREFUSED` | MongoDB not running - Start mongod |
| `EADDRINUSE` | Port 3000 in use - Change PORT in `.env` |
| `Cannot find module` | Run `npm install` in backend folder |
| Frontend shows sample data | Backend not running - Start server |

## Folder Structure

```
full stack/
├── pa1.html              ← Frontend (open in browser)
├── backend/
│   ├── server.js        ← Backend API
│   ├── package.json     ← Dependencies
│   ├── .env            ← Config
│   ├── seed.js         ← Sample data
│   ├── models/         ← Database schemas
│   └── routes/         ← API endpoints
```

## Common Commands

```bash
# Install dependencies
npm install

# Start development server (with auto-reload)
npm run dev

# Start production server
npm start

# Seed database with sample data
node seed.js

# View MongoDB data
mongosh
```

## API Quick Reference

**Get all news:**
```
GET http://localhost:3000/api/news
```

**Get news by category:**
```
GET http://localhost:3000/api/news?category=LLM
```

**Get all tools:**
```
GET http://localhost:3000/api/tools
```

**Create news:**
```
POST http://localhost:3000/api/news
```

**Health check:**
```
GET http://localhost:3000/api/health
```

---

**That's it!** You now have a fully functional backend serving your frontend. 🎉

For detailed documentation, see `BACKEND_SETUP.md`.

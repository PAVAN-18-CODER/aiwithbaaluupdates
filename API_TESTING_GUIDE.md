# API Testing Guide - AI with Baalu Backend

After starting the backend server with `npm run dev`, test these endpoints to verify everything is working.

---

## 🧪 Method 1: Using Browser (Easiest)

Simply paste these URLs into your browser:

### Health Check
```
http://localhost:3000/api/health
```
Expected response:
```json
{
  "status": "Backend is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Get All News
```
http://localhost:3000/api/news
```
Should return array of 6 news articles with titles, excerpts, categories

### Get All Tools
```
http://localhost:3000/api/tools
```
Should return array of 6 AI tools with names and descriptions

---

## 🧪 Method 2: Using Postman (Recommended)

1. Download Postman: https://www.postman.com/downloads/
2. Install and open Postman
3. Import this collection: `postman-collection.json`
   - File → Import → Select the JSON file
4. All endpoints will be ready to test

---

## 🧪 Method 3: Using Terminal/Command Prompt

### Get All News (Windows)
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/news" -Method GET
```

### Get All Tools (Windows)
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/api/tools" -Method GET
```

---

## 📋 Available Endpoints

### News Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/news` | Get all news articles |
| GET | `/api/news?category=LLM` | Get news by category |
| GET | `/api/news/:id` | Get specific news by ID |
| POST | `/api/news` | Create new article |

### Query Parameters for News
- `category` - Filter by category (LLM, Research, Vision, Optimization, Ethics, Tools)
- `featured` - Get only featured articles (true/false)
- `limit` - Number of articles (default: 100)
- `skip` - Pagination offset (default: 0)

**Example:**
```
http://localhost:3000/api/news?category=LLM&limit=5
```

### Tools Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tools` | Get all tools |
| GET | `/api/tools/:id` | Get specific tool by ID |

### Other Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |

---

## ✅ Test Cases

### Test 1: Server is Running
1. Open browser
2. Go to: `http://localhost:3000/api/health`
3. Should show: `{"status":"Backend is running",...}`

### Test 2: Database is Connected
1. Go to: `http://localhost:3000/api/news`
2. Should return array with 6 articles
3. Check that titles, categories, and dates are present

### Test 3: Frontend Connection
1. Open `pa1.html` in browser
2. Check browser console (F12)
3. Should show: "✅ Connected to backend" or fallback data message
4. News cards should display data

---

## 🔍 Sample Response Format

### News Article Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "emoji": "🧠",
      "title": "OpenAI Releases GPT-5",
      "excerpt": "Revolutionary new AI model...",
      "fullContent": "OpenAI has officially announced...",
      "category": "LLM",
      "date": "2024-01-15T10:00:00.000Z",
      "author": "AI with Baalu",
      "views": 0,
      "featured": false
    }
  ],
  "total": 6,
  "count": 6
}
```

### Tools Response
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "icon": "🤖",
      "name": "ChatGPT",
      "description": "Advanced conversational AI...",
      "link": "https://chatgpt.com",
      "category": "AI Tools",
      "rating": 0,
      "featured": false
    }
  ],
  "total": 6,
  "count": 6
}
```

---

## 🐛 Troubleshooting

**"Cannot connect to localhost:3000"**
- Make sure backend is running: `npm run dev`
- Check that port 3000 isn't already in use

**"Empty response from /api/news"**
- Database seeding failed
- Run: `node seed.js`
- Make sure MongoDB is running

**"Connection refused"**
- Backend server not started
- Open terminal in `backend` folder
- Run: `npm run dev`

---

## 📝 Next Steps

Once you verify all endpoints work:
1. ✓ Backend is running and tested
2. Move to **Step B: Enhance Frontend Features**
3. Implement real data from backend
4. Add Instagram integration

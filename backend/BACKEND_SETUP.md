# Backend Setup Guide - AI with Baalu

This guide will help you set up and run the Node.js/Express backend with MongoDB for the AI with Baalu project.

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (Local or Cloud) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

## Installation Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

This will install all required packages:
- express: Web framework
- mongoose: MongoDB ODM
- cors: Cross-Origin Resource Sharing
- dotenv: Environment variables
- nodemon: Auto-reload on code changes (dev)

### 2. Configure MongoDB

Edit the `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017/ai-news-db
PORT=3000
NODE_ENV=development
```

**Option A: Local MongoDB**
- Install MongoDB Community Edition
- Start MongoDB service:
  - **Windows**: `mongod`
  - **Mac**: `brew services start mongodb-community`
  - **Linux**: `sudo systemctl start mongod`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `.env` with your Atlas URI:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ai-news-db
  ```

### 3. Seed Sample Data (Optional)

Populate the database with sample news and tools:

```bash
node seed.js
```

You should see:
```
✅ Connected to MongoDB
🗑️  Cleared existing data
✅ Inserted 6 news articles
✅ Inserted 6 tools
🎉 Database seeded successfully!
```

### 4. Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:3000
📚 API Documentation:
   - GET /api/news - Get all news
   - GET /api/news/:id - Get specific news
   - POST /api/news - Create news
   - GET /api/tools - Get all tools
   - GET /api/health - Health check
```

## API Endpoints

### News Endpoints

#### Get all news
```
GET http://localhost:3000/api/news
```
Query parameters:
- `category`: Filter by category
- `featured`: Get only featured news (`true`/`false`)
- `limit`: Number of results (default: 100)
- `skip`: Skip number of results (default: 0)

Example:
```
GET http://localhost:3000/api/news?category=LLM&limit=10
```

#### Get specific news
```
GET http://localhost:3000/api/news/[newsId]
```

#### Create new news
```
POST http://localhost:3000/api/news
Content-Type: application/json

{
  "emoji": "🤖",
  "title": "AI News Title",
  "excerpt": "Short summary",
  "fullContent": "Full article content",
  "category": "LLM",
  "author": "Author Name"
}
```

#### Get news by category
```
GET http://localhost:3000/api/news/category/[categoryName]
```

#### Get all categories
```
GET http://localhost:3000/api/news/categories/list/all
```

### Tools Endpoints

#### Get all tools
```
GET http://localhost:3000/api/tools
```

#### Get specific tool
```
GET http://localhost:3000/api/tools/[toolId]
```

#### Create new tool
```
POST http://localhost:3000/api/tools
Content-Type: application/json

{
  "icon": "🤖",
  "name": "Tool Name",
  "description": "Tool description",
  "link": "https://example.com",
  "category": "AI Tools",
  "rating": 4.5
}
```

### Health Check
```
GET http://localhost:3000/api/health
```

## Testing the Connection

### Using cURL (Command Line)

```bash
# Test health check
curl http://localhost:3000/api/health

# Get all news
curl http://localhost:3000/api/news

# Get all tools
curl http://localhost:3000/api/tools
```

### Using Browser

1. Open your browser
2. Navigate to: `http://localhost:3000/api/health`
3. Navigate to: `http://localhost:3000/api/news`

### Using Postman

1. Download [Postman](https://www.postman.com/downloads/)
2. Create a new request
3. Set method to `GET`
4. Enter URL: `http://localhost:3000/api/news`
5. Click "Send"

## Frontend Integration

The frontend (`pa1.html`) is configured to connect to the backend at `http://localhost:3000/api`.

When you open `pa1.html` in a browser:
1. It will attempt to connect to the backend
2. If successful, it loads real data from the API
3. If the backend is unavailable, it uses fallback sample data
4. You'll see a notification indicating the connection status

## File Structure

```
backend/
├── server.js              # Express server setup
├── package.json           # Dependencies
├── .env                   # Configuration file
├── seed.js               # Database seeding script
├── models/
│   ├── News.js           # News schema
│   └── Tool.js           # Tool schema
├── routes/
│   ├── news.js           # News API routes
│   └── tools.js          # Tools API routes
```

## Troubleshooting

### MongoDB Connection Error
```
❌ MongoDB connection error: connect ECONNREFUSED
```
**Solution:**
- Ensure MongoDB service is running
- Check connection string in `.env`
- For local MongoDB: Run `mongod`
- For Atlas: Check internet connection and firewall

### Port 3000 Already in Use
```
listen EADDRINUSE: address already in use :::3000
```
**Solution:**
- Change PORT in `.env` to a different port (e.g., 3001)
- Or kill the process using port 3000

### CORS Error in Frontend
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:**
- The backend includes CORS configuration
- Check that frontend is accessing correct API URL
- Ensure backend is running on `http://localhost:3000`

### No Data Appears in Frontend
1. Check browser console for errors (Press F12)
2. Verify backend is running
3. Check API endpoints in browser: `http://localhost:3000/api/news`
4. Ensure MongoDB has data (run `seed.js`)

## Environment Variables

The `.env` file controls backend behavior:

| Variable | Default | Description |
|----------|---------|-------------|
| MONGODB_URI | mongodb://localhost:27017/ai-news-db | MongoDB connection string |
| PORT | 3000 | Server port |
| NODE_ENV | development | Environment mode |

## Production Deployment

For production deployment:

1. Update `.env` with production values
2. Change `NODE_ENV` to `production`
3. Use MongoDB Atlas for cloud database
4. Deploy to platforms like:
   - Heroku
   - AWS
   - DigitalOcean
   - Railway
   - Render

## Additional Commands

### View MongoDB Data

```bash
# Start MongoDB shell
mongosh

# List databases
show dbs

# Use database
use ai-news-db

# List collections
show collections

# View news items
db.news.find()

# View tools
db.tools.find()
```

## Support

For issues or questions:
1. Check browser console (F12) for frontend errors
2. Check terminal logs for backend errors
3. Refer to [Express Documentation](https://expressjs.com/)
4. Refer to [MongoDB Documentation](https://docs.mongodb.com/)

---

**Ready to go!** Your backend is now set up and ready to serve the AI with Baalu frontend. 🚀

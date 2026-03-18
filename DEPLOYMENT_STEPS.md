# 🚀 DEPLOYMENT GUIDE - Deploy Your Website Free Online

Your website is ready to deploy! Follow these steps to go live.

---

## **STEP 1: Deploy Backend to Render (FREE) ⚙️**

### 1.1 Push Code to GitHub

```bash
# If you haven't already pushed to GitHub:
git push origin main
```

**Need GitHub?** Go to https://github.com/new
- Create a new repository named "ai-with-baalu"
- Copy your project folder to GitHub (instructions on GitHub)

### 1.2 Deploy to Render

1. **Open** https://render.com
2. **Click** "Sign up" (use GitHub account)
3. **Click** "New+" → "Web Service"
4. **Connect GitHub repository** (select "ai-with-baalu")
5. **Fill in these settings:**
   - Name: `ai-with-baalu-backend`
   - Root Directory: `backend/`
   - Build Command: `npm install`
   - Start Command: `node server.js`
   - Environment: `Node`
6. **Click** "Create Web Service"
7. **Wait** 2-3 minutes for deployment
8. **Copy the URL** (looks like: https://ai-with-baalu-backend-xxxxx.onrender.com)

### 1.3 Add Environment Variables in Render

1. Go to your service → **Settings**
2. Scroll to **Environment Variables**
3. Add these variables:
   ```
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0-xxxxx.mongodb.net/ai-news-db?retryWrites=true&w=majority
   PORT=3000
   NODE_ENV=production
   ```
4. **Click** "Save"

**Your backend is now live!** ✅

---

## **STEP 2: Update Frontend with Live Backend URL 📝**

1. **Replace this line in `pa1.html` (Line ~1228):**
   ```javascript
   const API_BASE_URL = 'http://localhost:3000/api';
   ```
   
   **With your live backend URL:**
   ```javascript
   const API_BASE_URL = 'https://ai-with-baalu-backend-xxxxx.onrender.com/api';
   ```
   
   *(Use the exact URL from Render)*

2. **Save the file**
3. **Commit changes:**
   ```bash
   git add pa1.html
   git commit -m "Update frontend to use live backend URL"
   git push origin main
   ```

---

## **STEP 3: Deploy Frontend to Netlify (FREE) 🌐**

1. **Open** https://app.netlify.com
2. **Click** "Sign up" (use GitHub)
3. **Click** "Add new site" → "Import an existing project"
4. **Connect GitHub** and select your repository
5. **Configure:**
   - Base directory: (leave empty)
   - Build command: (leave empty)
   - Publish directory: (leave empty - root folder)
6. **Click** "Deploy site"
7. **Wait** 1-2 minutes
8. **Your website is LIVE!** 🎉

The URL will be something like: https://ai-with-baalu-xxxxx.netlify.app

---

## **STEP 4: Test Your Live Website ✅**

1. **Open** your Netlify URL in browser
2. **Verify:**
   - ✅ News articles load
   - ✅ AI tools appear
   - ✅ Newsletter subscription works
   - ✅ Contact form submits successfully
   - ✅ Dark mode toggle works
   - ✅ Search functionality works

---

## **Custom Domain (OPTIONAL) 🌟**

Want a custom domain like `aiwitbaalu.com`?

1. Buy domain at GoDaddy or Namecheap ($10-15/year)
2. In Netlify: **Settings** → **Domain management**
3. **Add custom domain** and follow DNS setup instructions

---

## **SUMMARY**

| Component | Hosting | Free Tier | URL |
|-----------|---------|-----------|-----|
| Backend | Render | ✅ Yes | https://ai-with-baalu-backend-xxxxx.onrender.com |
| Frontend | Netlify | ✅ Yes | https://ai-with-baalu-xxxxx.netlify.app |
| Database | MongoDB Atlas | ✅ Yes (M0 tier) | Cloud hosted |

---

**EXTRA:** Once MongoDB Atlas is connected, your data will persist! Newsletter subscribers and contact messages will be saved permanently.

If you have issues, check:
- Render service logs (Service → Logs)
- Netlify build logs (Deploys → View logs)
- Browser console (F12 → Console tab)

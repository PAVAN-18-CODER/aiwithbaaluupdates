# MongoDB Atlas Setup (2 Minutes)

## Quick Steps:

1. **Open this link in your browser:** 
   ```
   https://www.mongodb.com/cloud/atlas/register
   ```

2. **Sign up** (use your email)

3. **Create a Free Cluster:**
   - Click "Create" → Select "M0 Shared"
   - Choose region (AWS, US recommended)
   - Click "Create"
   - Wait 2-3 minutes

4. **Create Database User:**
   - Left menu → "Security" → "Database Access"
   - Click "Add New Database User"
   - Username: `admin`
   - Password: `Baalu@123456` (you can change this)
   - Built-in Role: "Atlas admin"
   - Click "Add User"

5. **Get Connection String:**
   - Click "Databases" → "Connect"
   - Select "Drivers"
   - Copy the connection string
   - **Replace `<password>` with your password: `Baalu@123456`**
   
   It should look like:
   ```
   mongodb+srv://admin:Baalu@123456@cluster0-xxxxx.mongodb.net/ai-news-db?retryWrites=true&w=majority
   ```

6. **When ready, paste it in the terminal and I'll update your .env file**

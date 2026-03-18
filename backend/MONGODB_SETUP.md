# 🚀 MONGODB ATLAS SETUP INSTRUCTIONS

## What You Need to Do (3 minutes):

### Step 1: Create Free MongoDB Account
1. Go to: https://www.mongodb.com/cloud/atlas
2. Click "Sign in" (top right)
3. Click "Sign up" (if no account)
4. Fill in simple info:
   - Email
   - Password
5. Click "Create my Atlas account"

### Step 2: Create a Database
1. After signup, click "Create" button
2. Choose "M0 FREE" (Free tier - perfect for us!)
3. Choose cloud provider: "AWS" (default is fine)
4. Close any popups with X button
5. Wait for deployment (~2 minutes)

### Step 3: Create User & Get Connection String
1. Click "Security" → "Database Access" (left menu)
2. Click "Add New Database User"
3. Authentication Method: "Password"
4. Username: `admin`
5. Password: `Admin123456` (copy this!)
6. Click "Add User"

### Step 4: Allow Access
1. Go to "Security" → "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Click "Confirm"

### Step 5: Get Connection String
1. Go to "Databases" (left menu)
2. Click "Connect" button
3. Click "Drivers"
4. Copy the connection string
5. Replace <username> with: admin
6. Replace <password> with: Admin123456
7. Should look like:
   mongodb+srv://admin:Admin123456@cluster.mongodb.net/ai-news-db?retryWrites=true&w=majority

## Then Tell Me:
Once you have the connection string, reply with "Ready for connection string"
And I'll update your .env file!

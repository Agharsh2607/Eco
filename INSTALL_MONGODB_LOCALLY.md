# 📦 Install MongoDB Locally on Windows

## Option 1: MongoDB Community Server (Recommended)

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - **Version:** Latest (7.0 or higher)
   - **Platform:** Windows
   - **Package:** MSI
3. Click "Download"

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose "Complete" installation
3. **Important:** Check "Install MongoDB as a Service"
4. **Important:** Check "Install MongoDB Compass" (GUI tool)
5. Click "Next" and "Install"
6. Wait for installation to complete

### Step 3: Verify Installation
Open Command Prompt or PowerShell and run:
```bash
mongod --version
```

You should see version information.

### Step 4: Start MongoDB Service

**Method A: Automatic (if installed as service)**
MongoDB should start automatically. Check with:
```bash
net start MongoDB
```

**Method B: Manual Start**
```bash
mongod --dbpath="C:\data\db"
```

Note: You may need to create the data directory first:
```bash
mkdir C:\data\db
```

### Step 5: Test Connection
Open another terminal and run:
```bash
mongosh
```

You should see the MongoDB shell. Type `exit` to quit.

### Step 6: Update Your .env File
Change the MongoDB URI to local:
```env
MONGODB_URI=mongodb://127.0.0.1:27017/ecotraveller
```

### Step 7: Restart Your App
```bash
npm start
```

You should see: `✓ MongoDB Connected`

---

## Option 2: Use MongoDB Atlas (Cloud - No Installation)

If you don't want to install MongoDB locally, use MongoDB Atlas (cloud):

### Advantages:
- ✅ No installation needed
- ✅ Works on any computer
- ✅ Free tier available
- ✅ Same database for local and production
- ✅ Automatic backups

### Setup:
1. You already have the connection string:
   ```
   mongodb+srv://ayishikg_db_user:<password>@ecotraveller.swozzac.mongodb.net/ecotraveller
   ```

2. Replace `<password>` with your actual MongoDB Atlas password

3. Update `.env` file with the full connection string

4. Restart your app

---

## Option 3: Keep Using File-Based Storage (Current)

Your app already works with file-based storage!

### Advantages:
- ✅ No installation needed
- ✅ Data persists in `data/users.json`
- ✅ Easy to backup
- ✅ Perfect for development

### Limitations:
- ❌ Won't work on Vercel (need MongoDB for production)
- ❌ Not suitable for high traffic

### Current Status:
Your app is using file-based storage and working perfectly!

---

## 🎯 Recommendation

**For Local Development:**
- Use **File-Based Storage** (current setup) - easiest, no installation

**For Production (Vercel):**
- Use **MongoDB Atlas** (cloud) - required for Vercel

**For Learning/Testing:**
- Install **MongoDB Community Server** - good for learning database concepts

---

## 🔧 Troubleshooting MongoDB Installation

### Error: "mongod is not recognized"
**Solution:** Add MongoDB to PATH:
1. Find MongoDB installation folder (usually `C:\Program Files\MongoDB\Server\7.0\bin`)
2. Add to Windows PATH environment variable
3. Restart terminal

### Error: "Data directory not found"
**Solution:** Create the directory:
```bash
mkdir C:\data\db
```

### Error: "Port 27017 already in use"
**Solution:** MongoDB is already running. Check with:
```bash
net start MongoDB
```

### MongoDB Service won't start
**Solution:** Run as Administrator:
```bash
net start MongoDB
```

---

## 📊 MongoDB Compass (GUI Tool)

If you installed MongoDB Compass:
1. Open MongoDB Compass
2. Connection string: `mongodb://localhost:27017`
3. Click "Connect"
4. You can see your databases, collections, and data visually

---

## 🚀 Quick Start Commands

```bash
# Start MongoDB service
net start MongoDB

# Stop MongoDB service
net stop MongoDB

# Check if MongoDB is running
mongosh

# View databases
mongosh
> show dbs
> use ecotraveller
> show collections
> db.users.find()
```

---

## ✅ Success Checklist

- [ ] MongoDB installed
- [ ] MongoDB service running
- [ ] Can connect with `mongosh`
- [ ] Updated `.env` with local connection string
- [ ] Restarted app
- [ ] Saw "✓ MongoDB Connected" message
- [ ] Tested creating a user account

---

## 💡 My Recommendation for You

Since you're deploying to Vercel anyway, I recommend:

1. **Keep using file-based storage locally** (current setup - works great!)
2. **Use MongoDB Atlas for Vercel** (required for production)

This way:
- ✅ No local installation needed
- ✅ Simple development
- ✅ Production-ready for Vercel
- ✅ Same database accessible from anywhere

Just update your MongoDB Atlas password in `.env` when you're ready to deploy!

# 🗄️ MongoDB Atlas Setup - Final Steps

## Your Connection String:
```
mongodb+srv://ayishikg_db_user:<db_password>@ecotraveller.swozzac.mongodb.net/ecotraveller
```

## ⚠️ IMPORTANT: Replace `<db_password>` with your actual password!

### Step 1: Find Your MongoDB Password

Your password is the one you created when setting up the database user `ayishikg_db_user`.

**If you forgot it:**
1. Go to https://cloud.mongodb.com/
2. Click on your project
3. Click "Database Access" in left sidebar
4. Find user `ayishikg_db_user`
5. Click "Edit"
6. Click "Edit Password"
7. Generate a new password or enter a custom one
8. Click "Update User"

### Step 2: Update .env File

Open the `.env` file and replace `<db_password>` with your actual password:

**Before:**
```env
MONGODB_URI=mongodb+srv://ayishikg_db_user:<db_password>@ecotraveller.swozzac.mongodb.net/ecotraveller?retryWrites=true&w=majority
```

**After (example):**
```env
MONGODB_URI=mongodb+srv://ayishikg_db_user:MySecurePass123@ecotraveller.swozzac.mongodb.net/ecotraveller?retryWrites=true&w=majority
```

### Step 3: Special Characters in Password

If your password contains special characters like `@`, `#`, `$`, `%`, etc., you need to URL encode them:

| Character | URL Encoded |
|-----------|-------------|
| @ | %40 |
| # | %23 |
| $ | %24 |
| % | %25 |
| ^ | %5E |
| & | %26 |
| + | %2B |
| = | %3D |

**Example:**
- Password: `Pass@123#`
- Encoded: `Pass%40123%23`

### Step 4: Test Connection Locally

After updating the `.env` file:

1. Stop the server (Ctrl+C)
2. Start it again:
   ```bash
   npm start
   ```
3. Look for this message:
   ```
   ✓ MongoDB Connected
   ```

If you see this, your connection is working! 🎉

### Step 5: Seed the Database (First Time Only)

Your MongoDB database is empty. You need to add the hotel data:

**Option A: Automatic Seeding**
The hotels will be automatically loaded from `data/hotels.json` if it exists.

**Option B: Manual Check**
Visit: http://localhost:5000/api/hotels

If it returns an empty array `[]`, the database is empty.

### Step 6: For Vercel Deployment

When deploying to Vercel, add this EXACT connection string (with your real password) as an environment variable:

1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - **Name:** `MONGODB_URI`
   - **Value:** `mongodb+srv://ayishikg_db_user:YOUR_REAL_PASSWORD@ecotraveller.swozzac.mongodb.net/ecotraveller?retryWrites=true&w=majority`

---

## 🔍 Troubleshooting

### Error: "MongoServerError: bad auth"
**Solution:** Wrong password. Double-check your password in MongoDB Atlas.

### Error: "MongooseServerSelectionError"
**Solution:** 
1. Check if IP whitelist includes 0.0.0.0/0 (allow all)
2. Go to MongoDB Atlas → Network Access → Add IP Address → Allow Access from Anywhere

### Error: "ENOTFOUND"
**Solution:** Check your internet connection and MongoDB cluster status.

---

## ✅ Quick Checklist

- [ ] Replaced `<db_password>` with actual password
- [ ] URL encoded special characters (if any)
- [ ] Saved `.env` file
- [ ] Restarted server
- [ ] Saw "✓ MongoDB Connected" message
- [ ] Tested http://localhost:5000/api/hotels

---

## 🎯 Next Steps

Once MongoDB is connected:
1. ✅ Test locally
2. ✅ Push to GitHub
3. ✅ Deploy to Vercel
4. ✅ Add environment variables in Vercel
5. ✅ Your app is live!

---

## 📞 Need Help?

If you're stuck, check:
- MongoDB Atlas Dashboard: https://cloud.mongodb.com/
- Connection string format
- Network access settings
- Database user permissions

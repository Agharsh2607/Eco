# 🚀 Deploy Eco Traveller to Vercel

Complete step-by-step guide to deploy your app to Vercel.

## ⚠️ Important Notes

**File Storage Limitation:**
- Vercel serverless functions are stateless
- The `data/users.json` file storage won't work on Vercel
- You MUST use MongoDB Atlas (cloud database) for production

## 📋 Prerequisites

1. GitHub account
2. Vercel account (free) - https://vercel.com
3. MongoDB Atlas account (free) - https://www.mongodb.com/cloud/atlas

---

## Step 1: Set Up MongoDB Atlas (Required for Vercel)

### 1.1 Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free"
3. Sign up with Google or email

### 1.2 Create a Cluster
1. Choose "FREE" tier (M0)
2. Select a cloud provider (AWS recommended)
3. Choose a region close to you
4. Click "Create Cluster" (takes 3-5 minutes)

### 1.3 Create Database User
1. Click "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Username: `ecotraveller`
5. Password: Generate a strong password (save it!)
6. Database User Privileges: "Read and write to any database"
7. Click "Add User"

### 1.4 Whitelist IP Address
1. Click "Network Access" in left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (0.0.0.0/0)
4. Click "Confirm"

### 1.5 Get Connection String
1. Click "Database" in left sidebar
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Copy the connection string (looks like):
   ```
   mongodb+srv://ecotraveller:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. Replace `<password>` with your actual password
6. Add database name at the end: `/ecotraveller`

**Final connection string example:**
```
mongodb+srv://ecotraveller:YourPassword123@cluster0.xxxxx.mongodb.net/ecotraveller?retryWrites=true&w=majority
```

---

## Step 2: Push Code to GitHub

### 2.1 Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit - Eco Traveller"
```

### 2.2 Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `eco-traveller`
3. Make it Public or Private
4. Don't initialize with README (we already have code)
5. Click "Create repository"

### 2.3 Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/eco-traveller.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### 3.1 Sign Up / Login to Vercel
1. Go to https://vercel.com
2. Click "Sign Up" or "Login"
3. Choose "Continue with GitHub"
4. Authorize Vercel to access your GitHub

### 3.2 Import Project
1. Click "Add New..." → "Project"
2. Find your `eco-traveller` repository
3. Click "Import"

### 3.3 Configure Project
1. **Framework Preset:** Other
2. **Root Directory:** ./
3. **Build Command:** (leave empty)
4. **Output Directory:** (leave empty)
5. **Install Command:** `npm install`

### 3.4 Add Environment Variables
Click "Environment Variables" and add these:

| Name | Value |
|------|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `SESSION_SECRET` | `eco-traveller-production-secret-key-2026` |
| `ADMIN_USERNAME` | `admin` (or your custom username) |
| `ADMIN_PASSWORD` | `EcoAdmin2026!Secure` (or your custom password) |
| `GOOGLE_CLIENT_ID` | Your Google OAuth Client ID (optional) |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth Secret (optional) |

**Important:** For Google OAuth, you need to add your Vercel domain to authorized redirect URIs:
- Go to Google Cloud Console
- Add: `https://your-app-name.vercel.app/auth/google/callback`

### 3.5 Deploy
1. Click "Deploy"
2. Wait 1-2 minutes for deployment
3. You'll get a URL like: `https://eco-traveller-xyz.vercel.app`

---

## Step 4: Update Google OAuth (if using)

1. Go to Google Cloud Console
2. Go to Credentials → Your OAuth Client
3. Add Authorized Redirect URI:
   ```
   https://your-app-name.vercel.app/auth/google/callback
   ```
4. Save changes

---

## Step 5: Test Your Deployment

### Test these URLs:
- ✅ Home: `https://your-app.vercel.app/`
- ✅ Login: `https://your-app.vercel.app/login.html`
- ✅ Calculator: `https://your-app.vercel.app/calculator.html`
- ✅ Stays: `https://your-app.vercel.app/stays.html`
- ✅ Community: `https://your-app.vercel.app/community.html`
- ✅ Admin Login: `https://your-app.vercel.app/admin-login.html`

### Test functionality:
1. Create a user account
2. Login with that account
3. Check if hotels load
4. Test admin panel
5. Test Google login (if configured)

---

## 🔧 Troubleshooting

### Issue: "Internal Server Error"
**Solution:** Check Vercel logs:
1. Go to your project in Vercel dashboard
2. Click "Deployments"
3. Click on the latest deployment
4. Click "Functions" tab
5. Check error logs

### Issue: "Cannot connect to MongoDB"
**Solution:** 
- Verify MongoDB connection string is correct
- Check if IP whitelist includes 0.0.0.0/0
- Ensure password doesn't have special characters (or URL encode them)

### Issue: "Hotels not loading"
**Solution:**
- MongoDB needs to be seeded with hotel data
- Visit: `https://your-app.vercel.app/api/hotels`
- If empty, you need to add hotels manually to MongoDB

### Issue: "Google OAuth not working"
**Solution:**
- Add Vercel domain to Google Cloud Console redirect URIs
- Update GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in Vercel env vars
- Redeploy after adding environment variables

---

## 📊 Vercel Dashboard Features

- **Deployments:** See all deployments and rollback if needed
- **Analytics:** View traffic and performance
- **Logs:** Real-time function logs
- **Domains:** Add custom domain (optional)
- **Environment Variables:** Update secrets without redeploying

---

## 🔄 Updating Your App

After making changes locally:

```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically detect the push and redeploy!

---

## 💰 Pricing

**Vercel Free Tier includes:**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Serverless functions
- ✅ Automatic HTTPS
- ✅ Custom domains

**MongoDB Atlas Free Tier includes:**
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Perfect for small apps

---

## 🎉 Success!

Your Eco Traveller app is now live on the internet!

Share your link: `https://your-app-name.vercel.app`

---

## 📝 Quick Commands Reference

```bash
# Deploy from CLI (alternative method)
npm i -g vercel
vercel login
vercel

# View logs
vercel logs

# Add environment variable
vercel env add MONGODB_URI

# Redeploy
vercel --prod
```

---

## 🔐 Security Checklist

- ✅ MongoDB connection string in environment variables (not in code)
- ✅ Admin password changed from default
- ✅ Session secret is random and secure
- ✅ Google OAuth credentials in environment variables
- ✅ .env file in .gitignore (never commit secrets)

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas Docs: https://docs.atlas.mongodb.com/
- Vercel Support: https://vercel.com/support

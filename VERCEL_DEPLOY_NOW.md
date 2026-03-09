# 🚀 Deploy to Vercel - Complete Guide

## ✅ Your Code is Ready on GitHub
Repository: **https://github.com/Agharsh2607/Eco**

---

## 📋 Step-by-Step Vercel Deployment

### Step 1: Go to Vercel
Visit: **https://vercel.com/new**

### Step 2: Sign In
- Click "Continue with GitHub"
- Authorize Vercel to access your GitHub

### Step 3: Import Your Repository
1. You'll see a list of your repositories
2. Find: **Agharsh2607/Eco**
3. Click "Import"

### Step 4: Configure Project Settings

**Project Name:** `eco-traveller` (lowercase, use hyphens)

**Framework Preset:** Other (leave as is)

**Root Directory:** `./` (leave as is)

**Build Command:** (leave empty)

**Output Directory:** (leave empty)

**Install Command:** `npm install` (should be auto-detected)

### Step 5: Add Environment Variables (CRITICAL!)

Click "Environment Variables" and add these **EXACTLY**:

#### Required Variables:

**1. MONGODB_URI**
```
mongodb+srv://ayishikg_db_user:YOUR_ACTUAL_PASSWORD@ecotraveller.swozzac.mongodb.net/ecotraveller?retryWrites=true&w=majority
```
⚠️ Replace `YOUR_ACTUAL_PASSWORD` with your real MongoDB Atlas password!

**2. ADMIN_USERNAME**
```
admin
```

**3. ADMIN_PASSWORD**
```
EcoAdmin2026!Secure
```

**4. SESSION_SECRET**
```
eco-traveller-production-secret-2026
```

#### Optional (for Google OAuth):

**5. GOOGLE_CLIENT_ID**
```
your_google_client_id_here
```

**6. GOOGLE_CLIENT_SECRET**
```
your_google_client_secret_here
```

**7. GOOGLE_CALLBACK_URL**
```
https://eco-traveller.vercel.app/auth/google/callback
```
(Replace `eco-traveller` with your actual Vercel project name)

### Step 6: Deploy!
Click the **"Deploy"** button

Wait 1-2 minutes for deployment to complete.

---

## 🎉 After Deployment

### Your Live URLs:

**Home Page:**
`https://eco-traveller.vercel.app/`

**Login Page:**
`https://eco-traveller.vercel.app/login.html`

**Admin Login:**
`https://eco-traveller.vercel.app/admin-login.html`

**Calculator:**
`https://eco-traveller.vercel.app/calculator.html`

**Stays:**
`https://eco-traveller.vercel.app/stays.html`

**Community:**
`https://eco-traveller.vercel.app/community.html`

(Replace `eco-traveller` with your actual Vercel URL)

---

## 🔐 Admin Access

**URL:** `https://your-app.vercel.app/admin-login.html`

**Username:** `admin`
**Password:** `EcoAdmin2026!Secure`

---

## ⚠️ Important: Get Your MongoDB Password

### Option 1: Reset Password
1. Go to: https://cloud.mongodb.com/
2. Login
3. Click "Database Access"
4. Find user: `ayishikg_db_user`
5. Click "Edit" → "Edit Password"
6. Click "Autogenerate Secure Password"
7. **COPY THE PASSWORD**
8. Click "Update User"

### Option 2: Use Existing Password
If you remember your MongoDB password, use it directly.

### Update Vercel Environment Variable:
1. Go to Vercel Dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Find `MONGODB_URI`
5. Click "Edit"
6. Replace `YOUR_ACTUAL_PASSWORD` with your real password
7. Click "Save"
8. Redeploy (Vercel will ask)

---

## 🔧 Troubleshooting

### Issue: "500 Internal Server Error"
**Solution:** Check that MongoDB password is correct in environment variables

### Issue: "Admin login not working"
**Solution:** Make sure `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set in Vercel environment variables

### Issue: "Hotels not loading"
**Solution:** MongoDB needs to be connected. Check the password in `MONGODB_URI`

### Issue: "Google login not working"
**Solution:** 
1. Add Google OAuth credentials to Vercel environment variables
2. Update Google Cloud Console redirect URI to your Vercel URL

---

## 📊 Check Deployment Logs

If something goes wrong:
1. Go to Vercel Dashboard
2. Click on your project
3. Click "Deployments"
4. Click on the latest deployment
5. Click "Functions" tab
6. Check error logs

---

## 🔄 Update Your App

After making changes locally:
```bash
git add .
git commit -m "Your update message"
git push
```

Vercel will automatically detect and redeploy!

---

## ✅ Deployment Checklist

- [ ] Signed in to Vercel with GitHub
- [ ] Imported Agharsh2607/Eco repository
- [ ] Set project name to `eco-traveller`
- [ ] Added `MONGODB_URI` with real password
- [ ] Added `ADMIN_USERNAME` = `admin`
- [ ] Added `ADMIN_PASSWORD` = `EcoAdmin2026!Secure`
- [ ] Added `SESSION_SECRET`
- [ ] Clicked "Deploy"
- [ ] Waited for deployment to complete
- [ ] Tested the live URL
- [ ] Tested admin login

---

## 🎯 Quick Links

- **Vercel Dashboard:** https://vercel.com/dashboard
- **MongoDB Atlas:** https://cloud.mongodb.com/
- **Your GitHub Repo:** https://github.com/Agharsh2607/Eco
- **Google Cloud Console:** https://console.cloud.google.com/

---

## 💡 Pro Tips

1. **Custom Domain:** You can add a custom domain in Vercel settings
2. **Analytics:** Enable Vercel Analytics to track visitors
3. **Logs:** Check function logs if something doesn't work
4. **Environment Variables:** Can be updated without redeploying code
5. **Rollback:** Can rollback to previous deployment if needed

---

## 🆘 Need Help?

If you're stuck:
1. Check Vercel deployment logs
2. Verify all environment variables are set correctly
3. Make sure MongoDB password is correct
4. Try redeploying from Vercel dashboard

Your app is ready to deploy! Just follow the steps above. 🚀

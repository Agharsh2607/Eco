# Login Data Storage - Explained

## Current Storage Architecture

### 1. Server-Side Storage (Backend)

#### Option A: In-Memory Storage (CURRENT - Development Only)
**Location:** `server.js` - `inMemoryUsers` array

```javascript
let inMemoryUsers = [
  {
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
    googleId: null,
    avatar: null
  }
];
```

**Pros:**
- No database setup needed
- Fast and simple for testing
- Works immediately

**Cons:**
- ❌ Data is lost when server restarts
- ❌ Not suitable for production
- ❌ Can't scale to multiple servers

**When data is lost:**
- Server restart
- Server crash
- Code changes

---

#### Option B: MongoDB Storage (PRODUCTION - Recommended)
**Location:** MongoDB database on your computer or cloud

**Database:** `ecotraveller`
**Collection:** `users`

```javascript
// User document in MongoDB
{
  _id: ObjectId("..."),
  name: "John Doe",
  email: "john@example.com",
  password: "password123",
  googleId: "123456789",
  avatar: "https://...",
  createdAt: ISODate("2026-03-09T...")
}
```

**Pros:**
- ✅ Data persists forever
- ✅ Production-ready
- ✅ Can handle millions of users
- ✅ Supports complex queries

**Cons:**
- Requires MongoDB installation or MongoDB Atlas account

**To enable MongoDB:**
1. Install MongoDB locally OR use MongoDB Atlas (cloud)
2. Start MongoDB service
3. Server will automatically use MongoDB instead of in-memory

---

### 2. Client-Side Storage (Browser)

#### localStorage (CURRENT)
**Location:** Browser's localStorage

**Key:** `'user'`
**Value:** JSON string

```javascript
// What's stored in browser
localStorage.setItem('user', JSON.stringify({
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://..."
}));
```

**View in Browser:**
1. Open Developer Tools (F12)
2. Go to "Application" tab
3. Click "Local Storage" → "http://localhost:5000"
4. See the `user` key

**Pros:**
- ✅ Persists after closing browser
- ✅ No server request needed to check login status
- ✅ Fast access

**Cons:**
- ❌ Can be cleared by user
- ❌ Not secure for sensitive data (passwords NOT stored here)
- ❌ Limited to 5-10MB

**When data is lost:**
- User clears browser data
- User clicks "Logout"
- Incognito/Private mode closed

---

### 3. Session Storage (Server Sessions)

#### express-session (CURRENT)
**Location:** Server memory (or can be configured to use database)

**What's stored:**
- Session ID (sent to browser as cookie)
- User authentication state
- Passport.js user object

**Pros:**
- ✅ More secure than localStorage
- ✅ Automatically managed by Passport.js
- ✅ Works with Google OAuth

**Cons:**
- Lost on server restart (unless using session store like Redis)

---

## Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         USER SIGNS UP                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  Browser sends: { name, email, password }                   │
│  → POST /api/signup                                          │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  SERVER (server.js)                                          │
│  ┌────────────────────────────────────────────────────┐    │
│  │ Check if MongoDB is available                       │    │
│  └────────────────────────────────────────────────────┘    │
│                    ↓                    ↓                    │
│         YES (MongoDB)          NO (In-Memory)               │
│              ↓                          ↓                    │
│  ┌──────────────────────┐   ┌──────────────────────┐      │
│  │ Save to MongoDB      │   │ Save to inMemoryUsers│      │
│  │ Collection: users    │   │ Array in RAM         │      │
│  └──────────────────────┘   └──────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  SERVER responds: { user: { name, email } }                 │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│  BROWSER (login.html)                                        │
│  localStorage.setItem('user', JSON.stringify(user))         │
│  → Redirect to home page                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Security Notes

### What IS stored in browser localStorage:
- ✅ User name
- ✅ User email
- ✅ Avatar URL
- ✅ Google ID (if using Google login)

### What is NOT stored in browser localStorage:
- ❌ Password (NEVER stored in localStorage)
- ❌ Session tokens (handled by cookies)
- ❌ Sensitive personal information

### Password Storage:
- **Current:** Plain text in database (⚠️ NOT SECURE)
- **Recommended:** Use bcrypt to hash passwords

---

## How to Check Your Data

### Check In-Memory Users (Server):
Add this endpoint to server.js:
```javascript
app.get('/api/debug/users', (req, res) => {
  res.json({ users: inMemoryUsers });
});
```
Visit: http://localhost:5000/api/debug/users

### Check Browser Storage:
1. Open http://localhost:5000
2. Press F12 (Developer Tools)
3. Go to "Application" tab
4. Click "Local Storage" → "http://localhost:5000"
5. See the `user` key

### Check MongoDB (if enabled):
```bash
mongosh
use ecotraveller
db.users.find()
```

---

## Upgrading to Production Storage

### Option 1: Local MongoDB
```bash
# Install MongoDB
# Start MongoDB service
mongod

# Server will automatically detect and use it
```

### Option 2: MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Add to .env:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecotraveller
```

### Option 3: Add Password Hashing (Security)
```bash
npm install bcrypt
```

Update server.js to hash passwords before storing.

---

## Summary

| Storage Type | Location | Persists? | Current Use |
|--------------|----------|-----------|-------------|
| In-Memory | Server RAM | ❌ No | ✅ Active (Dev) |
| MongoDB | Database | ✅ Yes | ❌ Not configured |
| localStorage | Browser | ✅ Yes | ✅ Active |
| Sessions | Server/Cookie | ❌ No* | ✅ Active (OAuth) |

*Sessions can persist with Redis/MongoDB session store

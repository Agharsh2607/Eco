# 🌍 Eco Traveller

AI-powered eco-friendly travel platform with verified green stays and CO2 tracking.

![Eco Traveller](https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800)

## ✨ Features

- 🏨 Verified eco-friendly hotels with CO2 savings
- 🧮 CO2 emissions calculator for travel routes
- 👥 Community features for eco-conscious travelers
- 🔐 User authentication (Email & Google OAuth)
- 📊 Admin dashboard for user management
- 💾 Persistent data storage (File-based or MongoDB)

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 14+ installed
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/eco-traveller.git
cd eco-traveller
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
npm start
```

4. Open your browser:
```
http://localhost:5000
```

## 🔑 Admin Access

**Admin Panel:** http://localhost:5000/admin-login.html

**Default Credentials:**
- Username: `admin`
- Password: `EcoAdmin2026!Secure`

⚠️ Change these in production by creating a `.env` file!

## 📁 Project Structure

```
eco-traveller/
├── public/              # Frontend files
│   ├── index.html       # Home page
│   ├── login.html       # User login/signup
│   ├── admin-login.html # Admin login
│   ├── admin.html       # Admin dashboard
│   ├── calculator.html  # CO2 calculator
│   ├── stays.html       # Hotel listings
│   └── community.html   # Community page
├── models/              # Database models
│   ├── Hotel.js
│   └── User.js
├── data/                # File-based storage (local only)
│   ├── users.json
│   └── hotels.json
├── server.js            # Express server
├── package.json
└── vercel.json          # Vercel deployment config
```

## 🌐 Deploy to Vercel

See detailed guide: [VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)

### Quick Deploy

1. Push to GitHub
2. Import to Vercel
3. Add environment variables:
   - `MONGODB_URI` (required for production)
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
   - `SESSION_SECRET`
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/eco-traveller)

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# MongoDB (Required for Vercel)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecotraveller

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!

# Session Secret
SESSION_SECRET=your-random-secret-key

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 📚 Documentation

- [Google OAuth Setup](./SETUP_GOOGLE_AUTH.md)
- [Data Storage Explained](./DATA_STORAGE_EXPLAINED.md)
- [Vercel Deployment Guide](./VERCEL_DEPLOYMENT_GUIDE.md)
- [Admin Credentials](./ADMIN_CREDENTIALS.txt)

## 🛠️ Tech Stack

- **Frontend:** HTML, Tailwind CSS, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (production) / File-based (development)
- **Authentication:** Passport.js, Google OAuth 2.0
- **Deployment:** Vercel

## 📊 API Endpoints

### Public Endpoints
- `GET /api/hotels` - Get all hotels
- `POST /api/login` - User login
- `POST /api/signup` - User signup

### OAuth Endpoints
- `GET /auth/google` - Initiate Google login
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/logout` - Logout

### Admin Endpoints (Protected)
- `POST /api/admin/login` - Admin login
- `GET /api/debug/users` - View all users (requires admin auth)

## 🔒 Security Features

- ✅ Password-based authentication
- ✅ Google OAuth 2.0 integration
- ✅ Admin panel with separate credentials
- ✅ Session management
- ✅ Environment variable protection
- ✅ HTTPS on production (Vercel)

## 🌱 Sustainability Features

- CO2 savings tracking for each hotel
- Travel emissions calculator
- Eco-friendly hotel verification
- Community engagement for sustainable travel

## 📈 Future Enhancements

- [ ] Password hashing (bcrypt)
- [ ] Email verification
- [ ] Booking system
- [ ] Payment integration
- [ ] User reviews and ratings
- [ ] AI-powered itinerary suggestions
- [ ] Mobile app (React Native)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Created with 💚 for a sustainable future

## 🙏 Acknowledgments

- Unsplash for beautiful images
- Tailwind CSS for styling
- MongoDB Atlas for database hosting
- Vercel for deployment platform

---

**Live Demo:** [Coming Soon]

**Questions?** Open an issue or contact us!

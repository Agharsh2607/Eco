const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

const Hotel = require('./models/Hotel');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'eco-traveller-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

// File-based storage paths
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const HOTELS_FILE = path.join(DATA_DIR, 'hotels.json');

// Create data directory if it doesn't exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

// Use in-memory data if MongoDB is not available
let useInMemory = false;
let inMemoryHotels = [];
let inMemoryUsers = [];

// Load users from file
function loadUsersFromFile() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.log('Error loading users file:', err.message);
  }
  return [];
}

// Save users to file
function saveUsersToFile(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
    console.log('✓ Users saved to file');
  } catch (err) {
    console.log('Error saving users file:', err.message);
  }
}

// Load hotels from file
function loadHotelsFromFile() {
  try {
    if (fs.existsSync(HOTELS_FILE)) {
      const data = fs.readFileSync(HOTELS_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.log('Error loading hotels file:', err.message);
  }
  return [];
}

// Save hotels to file
function saveHotelsToFile(hotels) {
  try {
    fs.writeFileSync(HOTELS_FILE, JSON.stringify(hotels, null, 2));
    console.log('✓ Hotels saved to file');
  } catch (err) {
    console.log('Error saving hotels file:', err.message);
  }
}

// Initialize users from file
inMemoryUsers = loadUsersFromFile();
console.log(`✓ Loaded ${inMemoryUsers.length} users from file`);

// Admin credentials from environment variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'EcoAdmin2026!Secure';

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🔐 ADMIN CREDENTIALS');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Username: ${ADMIN_USERNAME}`);
console.log(`Password: ${ADMIN_PASSWORD}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('⚠️  Change these in .env file for production!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

// Google OAuth Strategy
if(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET){
  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback"
    },
    async function(accessToken, refreshToken, profile, cb) {
      try {
        if(useInMemory){
          let user = inMemoryUsers.find(u => u.googleId === profile.id);
          if(!user){
            user = {
              id: Date.now().toString(),
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value,
              createdAt: new Date().toISOString()
            };
            inMemoryUsers.push(user);
            saveUsersToFile(inMemoryUsers); // Save to file
          }
          return cb(null, user);
        } else {
          let user = await User.findOne({ googleId: profile.id });
          if(!user){
            user = new User({
              googleId: profile.id,
              name: profile.displayName,
              email: profile.emails[0].value,
              avatar: profile.photos[0].value
            });
            await user.save();
          }
          return cb(null, user);
        }
      } catch(err) {
        return cb(err, null);
      }
    }
  ));
  console.log('✓ Google OAuth configured');
} else {
  console.log('⚠️  Google OAuth not configured (missing credentials in .env)');
}

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/ecotraveller';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 3000
}).then(()=>{
  console.log('✓ MongoDB Connected');
  useInMemory = false;
}).catch(err=>{
  console.log('⚠️  MongoDB not available, using file-based storage');
  console.log('   (Data persists in data/users.json)');
  useInMemory = true;
  
  // Load or seed hotels
  inMemoryHotels = loadHotelsFromFile();
  if(inMemoryHotels.length === 0) {
    seedInMemory();
    saveHotelsToFile(inMemoryHotels);
  }
});

function seedInMemory() {
  inMemoryHotels = [
    {
      name:'Green Haven Eco Resort',
      location:'Bali, Indonesia',
      price:220,
      rating:4.8,
      co2Savings:'-32%',
      imageUrl:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      tags:['Solar','Zero Waste','Organic Food']
    },
    {
      name:'Nordic Nature Lodge',
      location:'Norway',
      price:260,
      rating:4.9,
      co2Savings:'-40%',
      imageUrl:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      tags:['Hydropower','Eco Architecture']
    },
    {
      name:'Amazon Rainforest Retreat',
      location:'Brazil',
      price:180,
      rating:4.7,
      co2Savings:'-35%',
      imageUrl:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800',
      tags:['Rainwater','Local Materials']
    },
    {
      name:'Alpine Eco Chalet',
      location:'Switzerland',
      price:300,
      rating:4.9,
      co2Savings:'-45%',
      imageUrl:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      tags:['Passive Heating','Low Carbon']
    }
  ];
}

app.get('/api/hotels', async(req,res)=>{
  try{
    if(useInMemory){
      res.json(inMemoryHotels);
    } else {
      const hotels = await Hotel.find();
      res.json(hotels);
    }
  }catch(err){
    res.status(500).json({error:'Server error'});
  }
});

app.post('/api/login', async(req,res)=>{
  try{
    const {email, password} = req.body;
    
    if(useInMemory){
      const user = inMemoryUsers.find(u => u.email === email && u.password === password);
      if(user){
        res.json({user: {name: user.name, email: user.email}});
      } else {
        res.status(401).json({error:'Invalid credentials'});
      }
    } else {
      const user = await User.findOne({email, password});
      if(user){
        res.json({user: {name: user.name, email: user.email}});
      } else {
        res.status(401).json({error:'Invalid credentials'});
      }
    }
  }catch(err){
    res.status(500).json({error:'Login failed'});
  }
});

app.post('/api/signup', async(req,res)=>{
  try{
    const {name, email, password} = req.body;
    
    if(useInMemory){
      const exists = inMemoryUsers.find(u => u.email === email);
      if(exists){
        return res.status(400).json({error:'Email already exists'});
      }
      const newUser = {
        id: Date.now().toString(),
        name, 
        email, 
        password,
        createdAt: new Date().toISOString()
      };
      inMemoryUsers.push(newUser);
      saveUsersToFile(inMemoryUsers); // Save to file
      res.json({user: {name, email}});
    } else {
      const exists = await User.findOne({email});
      if(exists){
        return res.status(400).json({error:'Email already exists'});
      }
      const newUser = new User({name, email, password});
      await newUser.save();
      res.json({user: {name, email}});
    }
  }catch(err){
    res.status(500).json({error:'Signup failed'});
  }
});

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login.html' }),
  function(req, res) {
    res.redirect('/auth/success');
  }
);

app.get('/auth/success', (req, res) => {
  if(req.user){
    res.send(`
      <script>
        localStorage.setItem('user', JSON.stringify(${JSON.stringify(req.user)}));
        window.location.href = '/';
      </script>
    `);
  } else {
    res.redirect('/login.html');
  }
});

app.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

app.get('/api/user', (req, res) => {
  if(req.user){
    res.json({user: req.user});
  } else {
    res.status(401).json({error: 'Not authenticated'});
  }
});

// Admin authentication middleware
function isAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).json({ error: 'Invalid credentials' });
  }
}

// Admin login endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = Buffer.from(`${username}:${password}`).toString('base64');
    res.json({ 
      success: true, 
      token,
      message: 'Admin login successful' 
    });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
});

// Debug endpoint to view all users (remove in production!)
app.get('/api/debug/users', isAdmin, (req, res) => {
  if(useInMemory){
    res.json({ 
      storage: 'file-based (permanent)',
      storageLocation: USERS_FILE,
      count: inMemoryUsers.length,
      users: inMemoryUsers.map(u => ({
        id: u.id,
        name: u.name,
        email: u.email,
        hasPassword: !!u.password,
        googleId: u.googleId || null,
        createdAt: u.createdAt
      }))
    });
  } else {
    User.find().then(users => {
      res.json({
        storage: 'mongodb',
        count: users.length,
        users: users.map(u => ({
          name: u.name,
          email: u.email,
          hasPassword: !!u.password,
          googleId: u.googleId || null
        }))
      });
    });
  }
});

app.listen(5000,()=>console.log('Server running on port 5000'));

module.exports = app;

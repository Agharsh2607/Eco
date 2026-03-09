# Google OAuth Setup Instructions - Step by Step

## Step 1: Go to Google Cloud Console

1. Open your browser and go to: https://console.cloud.google.com/
2. Sign in with your Google account

## Step 2: Create a New Project

1. Click on the project dropdown at the top (next to "Google Cloud")
2. Click "NEW PROJECT"
3. Enter project name: **Eco Traveller**
4. Click "CREATE"
5. Wait for the project to be created (notification will appear)
6. Select your new project from the dropdown

## Step 3: Enable Google+ API (Optional but recommended)

1. In the left sidebar, click "APIs & Services" → "Library"
2. Search for "Google+ API"
3. Click on it and press "ENABLE"

## Step 4: Configure OAuth Consent Screen

1. In the left sidebar, click "APIs & Services" → "OAuth consent screen"
2. Select **External** (unless you have a Google Workspace)
3. Click "CREATE"
4. Fill in the required fields:
   - **App name**: Eco Traveller
   - **User support email**: Select your email from dropdown
   - **Developer contact information**: Enter your email
5. Click "SAVE AND CONTINUE"
6. On "Scopes" page, click "SAVE AND CONTINUE" (no changes needed)
7. On "Test users" page, click "ADD USERS" and add your email (for testing)
8. Click "SAVE AND CONTINUE"
9. Review and click "BACK TO DASHBOARD"

## Step 5: Create OAuth 2.0 Credentials

1. In the left sidebar, click "APIs & Services" → "Credentials"
2. Click "CREATE CREDENTIALS" at the top
3. Select "OAuth client ID"
4. Choose Application type: **Web application**
5. Enter name: **Eco Traveller Web Client**
6. Under "Authorized redirect URIs":
   - Click "ADD URI"
   - Enter: `http://localhost:5000/auth/google/callback`
   - Click "ADD URI" again
   - Enter: `http://127.0.0.1:5000/auth/google/callback`
7. Click "CREATE"

## Step 6: Copy Your Credentials

A popup will appear with your credentials:
- **Client ID**: Something like `123456789-abc123.apps.googleusercontent.com`
- **Client Secret**: Something like `GOCSPX-abc123xyz`

**IMPORTANT**: Copy both of these!

## Step 7: Create .env File

1. In your project folder (Ecooo), create a new file named `.env`
2. Add the following (replace with your actual credentials):

```env
GOOGLE_CLIENT_ID=paste_your_client_id_here
GOOGLE_CLIENT_SECRET=paste_your_client_secret_here
SESSION_SECRET=eco-traveller-super-secret-key-12345
```

Example:
```env
GOOGLE_CLIENT_ID=123456789-abc123def456.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abc123xyz789
SESSION_SECRET=eco-traveller-super-secret-key-12345
```

## Step 8: Install dotenv Package

Run this command in your terminal:
```bash
npm install dotenv
```

## Step 9: Restart Your Server

1. Stop the current server (Ctrl+C in terminal)
2. Run: `npm start`

## Step 10: Test Google Login

1. Go to: http://localhost:5000/login.html
2. Click the "Google" button
3. Sign in with your Google account
4. Grant permissions
5. You'll be redirected back to the home page, logged in!

---

## Troubleshooting

### Error: "redirect_uri_mismatch"
- Make sure the redirect URI in Google Console exactly matches: `http://localhost:5000/auth/google/callback`
- Check for typos, extra spaces, or missing `/callback`

### Error: "Access blocked: This app's request is invalid"
- Make sure you completed the OAuth consent screen setup
- Add yourself as a test user

### Google button doesn't work
- Check that your `.env` file is in the root folder (same level as server.js)
- Make sure you installed dotenv: `npm install dotenv`
- Restart the server after creating .env file

### Still not working?
- Check the server console for error messages
- Make sure your credentials are correct (no extra spaces)
- Try using `http://127.0.0.1:5000` instead of `localhost`

---

## Quick Links

- Google Cloud Console: https://console.cloud.google.com/
- OAuth Consent Screen: https://console.cloud.google.com/apis/credentials/consent
- Credentials Page: https://console.cloud.google.com/apis/credentials

---

## Security Notes

- Never commit your `.env` file to Git (it's already in .gitignore)
- Keep your Client Secret private
- For production, use a proper domain instead of localhost
- Change SESSION_SECRET to a random string for production

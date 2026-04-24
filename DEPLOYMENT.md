# ─── DEPLOYMENT GUIDE ─────────────────────────────────────────────────────────

# The Royal Salon & Spa — Full Stack Deployment

# ───────────────────────────────────────────────────────────────────────────────

## STEP 1: MongoDB Atlas (Database)

# 1. Go to https://cloud.mongodb.com and create a free account

# 2. Create a new cluster (M0 Free tier)

# 3. Click "Connect" → "Connect your application"

# 4. Copy the connection string:

# mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/royal_salon_spa

# 5. Save this as your MONGODB_URI

## STEP 2: Resend (Email)

# The app uses Resend — NOT nodemailer/SMTP.

# 1. Go to https://resend.com and create a free account

# 2. Go to API Keys → Create API Key → copy it as RESEND_API_KEY

#

# ⚠️ FREE TIER RESTRICTION:

# - You can only send emails TO your own verified Resend email address

# - FROM must stay as "onboarding@resend.dev" until you verify a domain

# - To send to any email (customers), verify your domain:

# Resend Dashboard → Domains → Add Domain → follow DNS instructions

# - Once domain is verified, set FROM_EMAIL to:

# "The Royal Salon & Spa <noreply@theroyalspa.in>"

## STEP 3: Backend → Railway (Recommended) or Render

# REQUIRED environment variables (add in Railway/Render dashboard):

MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/royal_salon_spa
JWT_SECRET=change_this_to_a_long_random_string_min_32_chars
JWT_EXPIRES_IN=7d
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-app.vercel.app

# Admin account (seeded automatically on first run)

ADMIN_EMAIL=your-verified-email@gmail.com
ADMIN_PASSWORD=YourSecurePassword123!

# Resend email

RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# FROM_EMAIL is optional — defaults to onboarding@resend.dev (safe for free tier)

# Uncomment below ONLY after verifying your domain in Resend:

# FROM_EMAIL=The Royal Salon & Spa <noreply@theroyalspa.in>

# Railway will auto-detect Node.js and run `npm start`

# Your backend URL: https://your-app.railway.app

## STEP 4: Frontend → Vercel

# 1. Push frontend code to GitHub

# 2. Go to https://vercel.com → New Project → Import from GitHub

# 3. Select your frontend repo

# 4. Add environment variable:

REACT_APP_API_URL=https://your-backend.railway.app/api

# 5. Vercel auto-detects Create React App and builds it

# 6. Your frontend URL: https://royal-salon-spa.vercel.app

## STEP 5: Update CORS

# In Backend/server.js, FRONTEND_URL is already read from env — just set it.

# Railway env var: FRONTEND_URL=https://royal-salon-spa.vercel.app

## STEP 6: Verify deployment

# ✅ https://your-backend.railway.app/api/health → { status: "ok" }

# ✅ https://your-frontend.vercel.app → Home page loads with gold fonts

# ✅ Submit a test booking → check Railway logs for "✅ Confirmation email sent"

# ✅ Check your ADMIN_EMAIL inbox for the new booking alert

# ✅ Contact form → check admin inbox for the contact message

## TROUBLESHOOTING RESEND

# If emails are silently failing, check your Railway/Render logs for:

# ❌ Resend returned error: { ... }

#

# Common errors:

# "You can only send testing emails to your own email address"

# → You're on the free tier. Either verify your domain OR

# set ADMIN_EMAIL + client emails to your own Resend-verified address for testing.

#

# "API key is invalid"

# → RESEND_API_KEY env var is wrong or not set. Copy it fresh from resend.com/api-keys.

#

# "The gmail.com domain is not verified"

# → Don't use Gmail as FROM_EMAIL. Keep using onboarding@resend.dev as FROM until

# you verify your OWN domain (theroyalspa.in) in Resend.

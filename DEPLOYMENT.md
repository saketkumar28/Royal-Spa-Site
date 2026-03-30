# ─── DEPLOYMENT GUIDE ─────────────────────────────────────────────────────────
# The Royal Salon & Spa — Full Stack Deployment
# ───────────────────────────────────────────────────────────────────────────────

## STEP 1: MongoDB Atlas (Database)
# 1. Go to https://cloud.mongodb.com and create a free account
# 2. Create a new cluster (M0 Free tier)
# 3. Click "Connect" → "Connect your application"
# 4. Copy the connection string:
#    mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/royal_salon_spa
# 5. Save this as your MONGODB_URI

## STEP 2: Backend → Railway (Recommended) or Render
#
# RAILWAY:
# 1. Push backend code to GitHub
# 2. Go to https://railway.app → New Project → Deploy from GitHub
# 3. Select your backend repo
# 4. Add environment variables in Railway dashboard:
#
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/royal_salon_spa
JWT_SECRET=change_this_to_a_long_random_string_min_32_chars
JWT_EXPIRES_IN=7d
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
ADMIN_EMAIL=admin@theroyalspa.in
ADMIN_PASSWORD=YourSecurePassword123!
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=youremail@gmail.com
EMAIL_PASS=your_gmail_app_password
#
# Railway will auto-detect Node.js and run `npm start`
# Your backend URL will be: https://your-app.railway.app

## STEP 3: Frontend → Vercel
# 1. Push frontend code to GitHub
# 2. Go to https://vercel.com → New Project → Import from GitHub
# 3. Select your frontend repo
# 4. Add environment variable:
REACT_APP_API_URL=https://your-backend.railway.app/api
# 5. Vercel auto-detects Create React App and builds it
# 6. Your frontend URL: https://royal-salon-spa.vercel.app

## STEP 4: CORS update
# In backend server.js, update CORS origin:
# origin: process.env.FRONTEND_URL || "https://royal-salon-spa.vercel.app"

## STEP 5: Verify deployment
# ✅ https://your-backend.railway.app/api/health → { status: "ok" }
# ✅ https://your-frontend.vercel.app → Home page loads
# ✅ https://your-frontend.vercel.app/admin → Admin login works
# ✅ Book a test appointment end-to-end

# ─── vercel.json (place in frontend root) ─────────────────────────────────────

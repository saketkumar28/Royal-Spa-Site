# 👑 The Royal Salon & Spa — MERN Stack

Premium luxury spa website with full booking system, admin dashboard, and REST API.

---

## 🏗️ Project Structure

```
royal-salon-spa/
├── backend/                    ← Node.js + Express + MongoDB
│   ├── server.js               ← Entry point
│   ├── models/
│   │   ├── User.model.js
│   │   ├── Booking.model.js
│   │   └── Service.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── booking.routes.js
│   │   ├── service.routes.js
│   │   ├── dashboard.routes.js
│   │   └── contact.routes.js
│   ├── middleware/
│   │   └── auth.middleware.js
│   └── .env.example
│
└── frontend/                   ← React + Tailwind
    ├── src/
    │   ├── App.js              ← Main page (Home)
    │   ├── pages/
    │   │   └── AdminDashboard.jsx
    │   ├── components/
    │   │   ├── Header.jsx
    │   │   ├── HeroSection.jsx
    │   │   ├── ServicesSection.jsx
    │   │   ├── VisualBreakSection.jsx
    │   │   ├── AboutSection.jsx
    │   │   ├── WellnessJournalSection.jsx  ← Blog section
    │   │   ├── BookingSection.jsx          ← API-connected
    │   │   ├── InstagramGallery.jsx
    │   │   ├── TestimonialsSection.jsx
    │   │   └── Footer.jsx
    │   └── services/
    │       └── api.js          ← All API calls
```

---

## 🚀 Setup Instructions

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB URI
npm run dev
```

Server starts on `http://localhost:5000`
Auto-seeds admin user + 6 services on first run.

### 2. Frontend

```bash
cd frontend
npx create-react-app . --template cra-template
npm install
# Copy all component files into src/
npm start
```

Set `REACT_APP_API_URL=http://localhost:5000/api` in frontend `.env`

---

## 🔐 Admin Credentials (default)

| Field    | Value                      |
|----------|----------------------------|
| Email    | admin@theroyalspa.in       |
| Password | Admin@Royal2026            |

> ⚠️ Change these in `.env` before deploying to production!

---

## 🌐 API Endpoints

### Public
| Method | Route                             | Description              |
|--------|-----------------------------------|--------------------------|
| GET    | `/api/services`                   | Get all active services  |
| POST   | `/api/bookings`                   | Create new booking       |
| GET    | `/api/bookings/available-slots`   | Check slot availability  |
| POST   | `/api/contact`                    | Send contact message     |
| GET    | `/api/health`                     | Health check             |

### Protected (Bearer token required)
| Method | Route                        | Description              |
|--------|------------------------------|--------------------------|
| POST   | `/api/auth/login`            | Admin login              |
| GET    | `/api/auth/me`               | Get current user         |
| GET    | `/api/bookings`              | List all bookings        |
| PATCH  | `/api/bookings/:id/status`   | Update booking status    |
| DELETE | `/api/bookings/:id`          | Delete booking (admin)   |
| POST   | `/api/services`              | Add new service (admin)  |
| PUT    | `/api/services/:id`          | Edit service (admin)     |
| GET    | `/api/dashboard/stats`       | Dashboard statistics     |

---

## 🗂️ Data Models

### Booking
- clientName, clientEmail, clientPhone
- service (ref: Service), bookingDate, timeSlot
- status: `pending | confirmed | completed | cancelled`
- totalAmount, paymentStatus, notes

### Service
- name, category, duration (mins), price
- description, isActive, bookingCount

### User (Admin/Staff)
- name, email, password (bcrypt), role: `admin | staff`

---

## 🔌 Connecting Booking Form to Backend

The `BookingSection.jsx` component is fully API-connected:
1. Loads services from `GET /api/services` on mount
2. Checks slot availability from `GET /api/bookings/available-slots?date=YYYY-MM-DD` on date change
3. Submits to `POST /api/bookings` with full validation
4. Shows real error messages (e.g. "slot already booked")

---

## 🚢 Deployment

### Backend → Railway / Render
1. Push backend to GitHub
2. Connect repo to Railway/Render
3. Set env vars: `MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`

### Frontend → Vercel / Netlify
1. Push frontend to GitHub
2. Set `REACT_APP_API_URL=https://your-backend-url.com/api`
3. Deploy

### MongoDB → MongoDB Atlas (free tier)
1. Create cluster at cloud.mongodb.com
2. Get connection string → set as `MONGODB_URI`

---

## 📅 Deadline: April 1, 2026

**By:** Saketkumar | **Client:** Asan Innovators | **PM:** Sravanthi Nuthanapati

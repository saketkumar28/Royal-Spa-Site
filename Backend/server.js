const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const authRoutes = require("./Routes/Auth.routes.js");
const bookingRoutes = require("./Routes/Booking.routes.js");
const serviceRoutes = require("./Routes/Service.routes.js");
const contactRoutes = require("./Routes/Contact.routes.js");
const dashboardRoutes = require("./Routes/Dashboard.routes.js");

const app = express();

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Royal Salon & Spa API running",
    timestamp: new Date(),
  });
});

// ─── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── DB + SERVER START ────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGODB_URI)
  .then(async () => {
    console.log("✅ MongoDB connected");
    await seedAdminUser();
    await seedServices();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// ─── SEED FUNCTIONS ───────────────────────────────────────────────────────────
async function seedAdminUser() {
  const User = require("./models/User.model");
  const bcrypt = require("bcryptjs");
  const existing = await User.findOne({ email: process.env.ADMIN_EMAIL });
  if (!existing) {
    const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 12);
    await User.create({
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      password: hash,
      role: "admin",
    });
    console.log("👑 Admin user seeded");
  }
}

async function seedServices() {
  const Service = require("./Models/Service.model.js");
  const count = await Service.countDocuments();
  if (count === 0) {
    await Service.insertMany([
      {
        name: "Royal Signature Facial",
        category: "Facial",
        duration: 90,
        price: 4500,
        description:
          "A bespoke facial using 24k gold serum and diamond dust to restore radiance.",
        isActive: true,
      },
      {
        name: "Hot Stone Therapy",
        category: "Massage",
        duration: 75,
        price: 3800,
        description:
          "Volcanic basalt stones melt away tension and restore your body's natural energy flow.",
        isActive: true,
      },
      {
        name: "Aromatherapy Massage",
        category: "Massage",
        duration: 60,
        price: 3200,
        description:
          "Custom blended essential oils with Swedish technique to rejuvenate mind, body and soul.",
        isActive: true,
      },
      {
        name: "Bridal Package",
        category: "Bridal",
        duration: 240,
        price: 18000,
        description:
          "A complete head-to-toe bridal transformation including hair, makeup and relaxation rituals.",
        isActive: true,
      },
      {
        name: "Hair Spa Ritual",
        category: "Hair",
        duration: 45,
        price: 2500,
        description:
          "Premium Moroccan argan oil treatment that restores shine, strength and silkiness.",
        isActive: true,
      },
      {
        name: "Gold Leaf Body Wrap",
        category: "Body",
        duration: 120,
        price: 7500,
        description:
          "Full-body detox wrap infused with 24k gold and rare botanical extracts.",
        isActive: true,
      },
    ]);
    console.log("💅 Services seeded");
  }
}

module.exports = app;

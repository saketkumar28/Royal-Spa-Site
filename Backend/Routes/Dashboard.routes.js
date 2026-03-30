const express = require("express");
const Booking = require("../Models/Booking.model.js");
const Service = require("../Models/Service.model.js");
const { protect, adminOnly } = require("../Middlewares/Auth.middleware.js");

const router = express.Router();

// GET /api/dashboard/stats
router.get("/stats", protect, async (req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    const today = new Date(now.toDateString());

    const [
      totalBookings,
      pendingBookings,
      confirmedBookings,
      completedBookings,
      cancelledBookings,
      todayBookings,
      monthBookings,
      lastMonthBookings,
      totalRevenue,
      monthRevenue,
      totalServices,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ status: "completed" }),
      Booking.countDocuments({ status: "cancelled" }),
      Booking.countDocuments({ bookingDate: today }),
      Booking.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Booking.countDocuments({
        createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth },
      }),
      Booking.aggregate([
        { $match: { status: "completed", paymentStatus: "paid" } },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Booking.aggregate([
        {
          $match: {
            status: "completed",
            paymentStatus: "paid",
            createdAt: { $gte: startOfMonth },
          },
        },
        { $group: { _id: null, total: { $sum: "$totalAmount" } } },
      ]),
      Service.countDocuments({ isActive: true }),
    ]);

    // Top services
    const topServices = await Service.find({ isActive: true })
      .sort({ bookingCount: -1 })
      .limit(5)
      .select("name bookingCount price category");

    // Bookings per day (last 7 days)
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const next = new Date(d);
      next.setDate(next.getDate() + 1);
      const count = await Booking.countDocuments({
        bookingDate: { $gte: d, $lt: next },
        status: { $ne: "cancelled" },
      });
      last7Days.push({
        date: d.toISOString().split("T")[0],
        count,
      });
    }

    res.json({
      success: true,
      stats: {
        totalBookings,
        pendingBookings,
        confirmedBookings,
        completedBookings,
        cancelledBookings,
        todayBookings,
        monthBookings,
        lastMonthBookings,
        growthRate: lastMonthBookings
          ? (
              ((monthBookings - lastMonthBookings) / lastMonthBookings) *
              100
            ).toFixed(1)
          : 100,
        totalRevenue: totalRevenue[0]?.total || 0,
        monthRevenue: monthRevenue[0]?.total || 0,
        totalServices,
        topServices,
        last7Days,
      },
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: err.message });
  }
});

// GET /api/dashboard/recent-bookings
router.get("/recent-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("service", "name price category")
      .sort({ createdAt: -1 })
      .limit(10);
    res.json({ success: true, bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

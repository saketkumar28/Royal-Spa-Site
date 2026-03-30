const express = require("express");
const { body, query, validationResult } = require("express-validator");
const Booking = require("../Models/Booking.model.js");
const Service = require("../Models/Service.model.js");
const { protect, adminOnly } = require("../Middlewares/Auth.middleware.js");
const {
  sendBookingConfirmation,
  sendAdminNotification,
} = require("../Services/email.service.js");

const router = express.Router();

// ─── PUBLIC ───────────────────────────────────────────────────────────────────

// POST /api/bookings — create a new booking (public)
router.post(
  "/",
  [
    body("clientName").trim().notEmpty().withMessage("Name is required"),
    body("clientEmail").isEmail().withMessage("Valid email is required"),
    body("clientPhone").trim().notEmpty().withMessage("Phone is required"),
    body("service").notEmpty().withMessage("Service is required"),
    body("bookingDate").isISO8601().withMessage("Valid date is required"),
    body("timeSlot").notEmpty().withMessage("Time slot is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const {
        clientName,
        clientEmail,
        clientPhone,
        service,
        bookingDate,
        timeSlot,
        notes,
      } = req.body;

      // Check service exists
      const svc = await Service.findById(service);
      if (!svc || !svc.isActive) {
        return res.status(404).json({
          success: false,
          message: "Service not found or unavailable",
        });
      }

      // Check slot availability
      const conflict = await Booking.findOne({
        bookingDate: new Date(bookingDate),
        timeSlot,
        status: { $nin: ["cancelled"] },
      });
      if (conflict) {
        return res.status(409).json({
          success: false,
          message: "This time slot is already booked. Please choose another.",
        });
      }

      const booking = await Booking.create({
        clientName,
        clientEmail,
        clientPhone,
        service,
        bookingDate,
        timeSlot,
        notes,
      });

      // Increment service booking count
      await Service.findByIdAndUpdate(service, { $inc: { bookingCount: 1 } });

      await booking.populate("service", "name price duration");
      try {
        await sendBookingConfirmation({
          clientName: booking.clientName,
          clientEmail: booking.clientEmail,
          serviceName: booking.service.name,
          bookingDate: booking.bookingDate,
          timeSlot: booking.timeSlot,
          totalAmount: booking.service.price,
        });

        await sendAdminNotification({
          clientName: booking.clientName,
          clientEmail: booking.clientEmail,
          clientPhone: booking.clientPhone,
          serviceName: booking.service.name,
          bookingDate: booking.bookingDate,
          timeSlot: booking.timeSlot,
        });
      } catch (emailError) {
        console.error("Booking saved, but email failed:", emailError);
        // We don't return an error to the user here because their slot is technically secured!
      }

      res.status(201).json({
        success: true,
        message: "Booking confirmed! We'll reach out shortly.",
        booking,
      });
    } catch (err) {
      res
        .status(500)
        .json({ success: false, message: "Server error", error: err.message });
    }
  },
);

// GET /api/bookings/available-slots?date=YYYY-MM-DD&service=id
router.get("/available-slots", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date)
      return res.status(400).json({ success: false, message: "Date required" });

    const allSlots = [
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "1:00 PM",
      "2:00 PM",
      "3:00 PM",
      "4:00 PM",
      "5:00 PM",
      "6:00 PM",
    ];
    const booked = await Booking.find({
      bookingDate: new Date(date),
      status: { $nin: ["cancelled"] },
    }).select("timeSlot");

    const bookedSlots = booked.map((b) => b.timeSlot);
    const available = allSlots.filter((s) => !bookedSlots.includes(s));

    res.json({ success: true, available, booked: bookedSlots });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─── PROTECTED (Admin/Staff) ──────────────────────────────────────────────────

// GET /api/bookings — list all bookings with filters
router.get("/", protect, async (req, res) => {
  try {
    const { status, date, page = 1, limit = 20, search } = req.query;
    const filter = {};

    if (status) filter.status = status;
    if (date) filter.bookingDate = new Date(date);
    if (search) {
      filter.$or = [
        { clientName: { $regex: search, $options: "i" } },
        { clientEmail: { $regex: search, $options: "i" } },
        { clientPhone: { $regex: search, $options: "i" } },
      ];
    }

    const total = await Booking.countDocuments(filter);
    const bookings = await Booking.find(filter)
      .populate("service", "name price duration category")
      .populate("assignedStaff", "name email")
      .sort({ bookingDate: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      bookings,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/bookings/:id
router.get("/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("service")
      .populate("assignedStaff", "name email");
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    res.json({ success: true, booking });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// PATCH /api/bookings/:id/status
router.patch(
  "/:id/status",
  protect,
  [body("status").isIn(["pending", "confirmed", "completed", "cancelled"])],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const { status, cancelReason } = req.body;
      const update = { status };
      if (status === "confirmed") update.confirmedAt = new Date();
      if (status === "completed") update.completedAt = new Date();
      if (status === "cancelled" && cancelReason)
        update.cancelReason = cancelReason;

      const booking = await Booking.findByIdAndUpdate(req.params.id, update, {
        new: true,
      }).populate("service", "name price");
      if (!booking)
        return res
          .status(404)
          .json({ success: false, message: "Booking not found" });

      res.json({ success: true, booking });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

// DELETE /api/bookings/:id (admin only)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    res.json({ success: true, message: "Booking deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

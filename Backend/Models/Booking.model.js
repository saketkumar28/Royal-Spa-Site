const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    // Client info
    clientName: {
      type: String,
      required: [true, "Client name is required"],
      trim: true,
    },
    clientEmail: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email"],
    },
    clientPhone: {
      type: String,
      required: [true, "Phone is required"],
      trim: true,
    },

    // Booking details
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Service",
      required: [true, "Service is required"],
    },
    bookingDate: {
      type: Date,
      required: [true, "Booking date is required"],
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
      enum: [
        "10:00 AM",
        "11:00 AM",
        "12:00 PM",
        "1:00 PM",
        "2:00 PM",
        "3:00 PM",
        "4:00 PM",
        "5:00 PM",
        "6:00 PM",
      ],
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },

    // Status management
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    cancelReason: {
      type: String,
      trim: true,
    },

    // Payment (future use)
    totalAmount: {
      type: Number,
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },

    // Internal
    assignedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    confirmedAt: Date,
    completedAt: Date,
  },
  { timestamps: true },
);

// Auto-populate total from service price
bookingSchema.pre("save", async function (next) {
  if (this.service && this.isNew) {
    const Service = mongoose.model("Service");
    const svc = await Service.findById(this.service);
    if (svc) this.totalAmount = svc.price;
  }
  next();
});

// Index for common queries
bookingSchema.index({ bookingDate: 1, status: 1 });
bookingSchema.index({ clientEmail: 1 });

module.exports =
  mongoose.models.Booking || mongoose.model("Booking", bookingSchema);

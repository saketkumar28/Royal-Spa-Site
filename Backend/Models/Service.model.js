const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Service name is required"],
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["Facial", "Massage", "Hair", "Body", "Bridal", "Other"],
    },
    duration: {
      type: Number, // minutes
      required: true,
      min: 15,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 600,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
      default: "",
    },
    bookingCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

module.exports =
  mongoose.models.Service || mongoose.model("Service", serviceSchema);

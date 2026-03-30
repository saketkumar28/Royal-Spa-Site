const express = require("express");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../Models/User.model.js");
const { protect, adminOnly } = require("../Middlewares/Auth.middleware.js");

const router = express.Router();

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });

// POST /api/auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email required"),
    body("password").notEmpty().withMessage("Password required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await user.comparePassword(password))) {
        return res
          .status(401)
          .json({ success: false, message: "Invalid email or password" });
      }
      if (!user.isActive) {
        return res
          .status(403)
          .json({ success: false, message: "Account deactivated" });
      }

      const token = signToken(user._id);
      res.json({
        success: true,
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

// GET /api/auth/me — verify token & return current user
router.get("/me", protect, (req, res) => {
  res.json({ success: true, user: req.user });
});

// POST /api/auth/create-staff (admin only)
router.post(
  "/create-staff",
  protect,
  adminOnly,
  [
    body("name").notEmpty(),
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const bcrypt = require("bcryptjs");
      const { name, email, password } = req.body;
      const existing = await User.findOne({ email });
      if (existing)
        return res
          .status(400)
          .json({ success: false, message: "Email already in use" });

      const hash = await bcrypt.hash(password, 12);
      const user = await User.create({
        name,
        email,
        password: hash,
        role: "staff",
      });
      res.status(201).json({
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

module.exports = router;

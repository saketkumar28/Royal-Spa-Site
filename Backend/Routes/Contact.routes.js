const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();

// POST /api/contact
router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email required"),
    body("message").trim().notEmpty().withMessage("Message required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      // In production: send email via nodemailer here
      const { name, email, phone, subject, message } = req.body;
      console.log("📩 Contact form submission:", { name, email, subject });
      res.json({
        success: true,
        message: "Your message has been received. We'll be in touch soon!",
      });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

module.exports = router;

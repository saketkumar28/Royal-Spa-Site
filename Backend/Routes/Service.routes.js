const express = require("express");
const { body, validationResult } = require("express-validator");
const Service = require("../Models/Service.model.js");
const { protect, adminOnly } = require("../Middlewares/Auth.middleware.js");

const router = express.Router();

// GET /api/services — public, returns all active services
router.get("/", async (req, res) => {
  try {
    const { category, active } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (active !== "all") filter.isActive = true;

    const services = await Service.find(filter).sort({ category: 1, price: 1 });
    res.json({ success: true, services });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// GET /api/services/:id
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    res.json({ success: true, service });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST /api/services — admin only
router.post(
  "/",
  protect,
  adminOnly,
  [
    body("name").trim().notEmpty(),
    body("category").isIn([
      "Facial",
      "Massage",
      "Hair",
      "Body",
      "Bridal",
      "Other",
    ]),
    body("duration").isInt({ min: 15 }),
    body("price").isFloat({ min: 0 }),
    body("description").trim().notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ success: false, errors: errors.array() });

    try {
      const service = await Service.create(req.body);
      res.status(201).json({ success: true, service });
    } catch (err) {
      if (err.code === 11000)
        return res
          .status(400)
          .json({ success: false, message: "Service name already exists" });
      res.status(500).json({ success: false, message: "Server error" });
    }
  },
);

// PUT /api/services/:id — admin only
router.put("/:id", protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    res.json({ success: true, service });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// DELETE /api/services/:id — admin only (soft delete)
router.delete("/:id", protect, adminOnly, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true },
    );
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    res.json({ success: true, message: "Service deactivated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

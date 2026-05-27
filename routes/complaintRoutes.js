const express = require("express");
const router = express.Router();
const multer = require("multer");
const Complaint = require("../models/Complaint");

// 📸 storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ POST - submit complaint
router.post("/", upload.single("image"), async (req, res) => {
  console.log("BODY:", req.body);
  console.log("FILE:", req.file);

  try {
    const newComplaint = new Complaint({
      name: req.body.name,
      phone: req.body.phone,
      areaType: req.body.areaType,
      location: req.body.location,
      address: req.body.address,
      image: req.file ? req.file.filename : "",
    });

    await newComplaint.save();

    res.json({ message: "Complaint saved ✅" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET - fetch all complaints
router.get("/", async (req, res) => {
  console.log("GET /api/complaints HIT");

  try {
    const data = await Complaint.find()
      .sort({ createdAt: -1 })
      .lean();

    console.log("DATA:", data);

    res.json(data);
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE - remove complaint (NEW 🔥)
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Complaint.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    res.json({ message: "Complaint deleted ✅" });

  } catch (err) {
    console.log("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
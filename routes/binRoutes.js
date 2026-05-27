const express = require("express");
const router = express.Router();
const Bin = require("../models/bin");

// ✅ GET ALL BINS
router.get("/", async (req, res) => {
  try {
    const bins = await Bin.find().sort({ updatedAt: -1 });
    res.json(bins);
  } catch (error) {
    console.log("GET ALL ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ GET BIN BY ID
router.get("/:binId", async (req, res) => {
  try {
    const bin = await Bin.findOne({ binId: req.params.binId });

    if (!bin) {
      return res.status(404).json({ message: "Bin not found" });
    }

    res.json(bin);
  } catch (error) {
    console.log("GET BY ID ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ UPDATE BIN (ESP DATA)
router.post("/update", async (req, res) => {
  try {
    console.log("🔥 ESP DATA RECEIVED:", req.body); // IMPORTANT DEBUG

    const { binId, level } = req.body;

    // ❌ अगर data नहीं आया
    if (!binId || level === undefined) {
      return res.status(400).json({ message: "Invalid data from ESP" });
    }

    // ✅ STATUS CALCULATION
    let status = "EMPTY";
    if (level > 80) status = "FULL";
    else if (level > 40) status = "MEDIUM";

    let bin = await Bin.findOne({ binId });

    if (!bin) {
      // ✅ CREATE NEW BIN
      bin = new Bin({
        binId,
        area: "Government Polytechnic",
        city: "Almora",
        level,
        status,
      });
    } else {
      // ✅ UPDATE EXISTING BIN
      bin.level = level;
      bin.status = status;
      bin.updatedAt = new Date();
    }

    await bin.save();

    console.log("✅ BIN SAVED:", bin);

    res.json({ msg: "Bin updated successfully", bin });

  } catch (error) {
    console.log("❌ UPDATE ERROR:", error);
    res.status(500).json({ message: "Update failed" });
  }
});

module.exports = router;
const mongoose = require("mongoose");

const binSchema = new mongoose.Schema({
  binId: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    default: "Government Polytechnic",
  },
  city: {
    type: String,
    default: "Almora",
  },
  level: {
    type: Number,
    default: 0,
  },

  // ✅ ADD THIS (IMPORTANT 🔥)
  status: {
    type: String,
    default: "EMPTY",
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Bin", binSchema);
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  name: String,
  phone: String,
  areaType: String,
  location: String,
  address: String,
  image: String,
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Complaint", complaintSchema);
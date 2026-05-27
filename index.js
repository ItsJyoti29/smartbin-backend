const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ✅ uploads folder serve
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/bins", require("./routes/binRoutes"));
app.use("/api/complaints", require("./routes/complaintRoutes"));

// test route
app.get("/", (req, res) => {
  res.send("API running ✅");
});

// ✅ PORT FIX
const PORT = process.env.PORT || 5000;

// database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected ✅");

    // ✅ IMPORTANT FIX FOR RENDER
    app.listen(PORT, "0.0.0.0", () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error("MongoDB Error ❌", err));
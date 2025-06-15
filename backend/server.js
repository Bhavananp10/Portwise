const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const clientRoutes = require("./routes/clients");
const assetRoutes = require("./routes/assets"); // ✅ Added asset routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.use("/api/clients", clientRoutes);
app.use("/api/assets", assetRoutes); // ✅ Mount asset route here

// ✅ MongoDB connection + Server boot
async function startServer() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
}

startServer();

// backend/server.js
import dotenv from "dotenv";
import mongoose from "mongoose";
import cloudinary from "cloudinary";
import app from "./app.js";

// Load environment variables
dotenv.config();

// ----------------------
// Cloudinary Configuration
// ----------------------
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ----------------------
// MongoDB Connection
// ----------------------
if (!process.env.MONGO_URL) {
  console.error("❌ ERROR: MONGO_URL is not defined in environment variables.");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ----------------------
// Health Check Endpoint
// ----------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ----------------------
// Start the Server
// ----------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

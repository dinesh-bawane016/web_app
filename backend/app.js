import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"; // your MongoDB connection file
import userRoutes from "./routes/userRoutes.js"; // example routes

dotenv.config(); // Load .env

const app = express();

// Middleware
app.use(express.json());

// CORS FIX for Render + Vercel
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL, 
      "https://frontend-qaa2xqb8r-dineshs-projects-830fb320.vercel.app" // Vercel URL
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// API routes
app.use("/api/users", userRoutes);

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB(); // Connect to MongoDB
});

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  try {
    const dbUrl = process.env.DB_URL;

    if (!dbUrl) {
      throw new Error("❌ DB_URL is missing in your .env file");
    }

    await mongoose.connect(dbUrl, {
      dbName: "Job_Portal",
    });

    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    process.exit(1); // crashes the app to avoid running without DB
  }
};

export default dbConnection;

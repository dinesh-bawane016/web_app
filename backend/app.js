// backend/app.js
import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import helmet from "helmet";
import morgan from "morgan";

import dbConnection from "./database/dbConnection.js";
import jobRouter from "./routes/jobRoutes.js";
import userRouter from "./routes/userRoutes.js";
import applicationRouter from "./routes/applicationRoutes.js";
import { errorMiddleware } from "./middlewares/error.js";

// Load env vars
config({ path: "./config/config.env" });

const app = express();

/*
|--------------------------------------------------------------------------
| CORS CONFIGURATION
|--------------------------------------------------------------------------
|
| We support:
| - Single frontend URL
| - Multiple allowed origins
| - ALLOW_ALL for easy testing
|
| FRONTEND_URL can be:
|   https://myapp.vercel.app
|   https://one.com,https://two.com
|   ALLOW_ALL
|
*/
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman, server-to-server
    if (allowedOrigins.includes(origin) || process.env.FRONTEND_URL === "ALLOW_ALL") {
      return callback(null, true);
    }
    console.log("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// Middlewares
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("tiny"));
app.use(cookieParser());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// API Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// DB connection
dbConnection();

// Error handler
app.use(errorMiddleware);

export default app;

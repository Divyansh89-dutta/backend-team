const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const authRoutes = require("./routers/authRoutes");
const eventRoutes = require("./routers/eventRoutes");
const ticketRoutes = require("./routers/ticketRoutes");

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(cors({ origin: process.env.FRONTEND_URL || "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// Rate Limiting 
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
});
app.use(limiter);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/tickets", ticketRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
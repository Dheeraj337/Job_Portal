const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authMiddleware = require("./middleware/authMiddleware");

dotenv.config();
connectDB();

const app = express();

if (!process.env.MONGO_URI || !process.env.JWT_SECRET) {
  console.warn("Missing environment variables: MONGO_URI or JWT_SECRET");
}

// ===== Middleware =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.setHeader("X-Powered-By", "JobPortalAPI");
  next();
});

// ===== Test Protected Route =====
app.get("/api/test", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

// ===== Routes =====
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/applications", require("./routes/applicationRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// ===== Root =====
app.get("/", (req, res) => {
  res.send("Job Portal API is running...");
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ message: "Server error" });
});

// ===== Server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

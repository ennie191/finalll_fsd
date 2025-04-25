require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db/connectDB"); // Import the database connection
const authRoutes = require("./routes/authRoutes"); // Import auth routes
const projectRoutes = require("./routes/projectRoutes"); // Import project routes
const collaborationRoutes = require("./routes/collaborationRoutes"); // Import collaboration routes
const statsRoutes = require("./routes/statsRoutes"); // Import stats routes
const adminRoutes = require("./routes/adminRoutes"); // Import admin routes
const mentorshipRoutes = require("./routes/mentorshipRoutes"); // Import mentorship routes
// Initialize the app
const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from the frontend

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Simple API request logger
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJson = undefined;

  const originalJson = res.json.bind(res);
  res.json = function (body, ...args) {
    capturedJson = body;
    return originalJson(body, ...args);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      console.log(`[${req.method}] ${path} - ${duration}ms`, capturedJson);
    }
  });

  next();
});

// Register routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/projects", projectRoutes); // Project routes
app.use("/api/collaboration", collaborationRoutes); // Collaboration routes
app.use("/api/stats", statsRoutes); // Statistics routes
app.use("/api/admin", adminRoutes); // Admin routes
app.use("/api/mentorship", mentorshipRoutes); // Mentorship routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
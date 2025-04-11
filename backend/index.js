// filepath: /Users/eeshanithakur/Desktop/finalll_fsd/backend/index.js
const { connectDB } = require("./db");
connectDB();
const express = require("express");
const cors = require("cors"); // Import cors
const authRoutes = require("./routes/authRoutes");

const app = express();

// Enable CORS
app.use(cors({ origin: "http://localhost:5173" })); // Allow requests from the frontend

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
app.use("/api", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
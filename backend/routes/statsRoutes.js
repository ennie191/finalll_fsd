const express = require("express");
const { getStats } = require("../controllers/statsController");
const { authMiddleware, adminMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, getStats); // Get statistics

module.exports = router; // Export the router
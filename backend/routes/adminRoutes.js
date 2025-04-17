const express = require("express");
const { getPendingProjects, updateProjectStatus } = require("../controllers/adminController");

const router = express.Router();

// Route to fetch all pending projects
router.get("/projects/pending", getPendingProjects);

// Route to update project status
router.post("/projects/status", updateProjectStatus);

module.exports = router;
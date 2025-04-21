const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getAllProjects, getProjectById, createProject,getProjectsBySDG } = require("../controllers/projectController");
const projects = require('../data/sampleprojects.json'); // Import the sample projects

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.post("/", createProject);

// Endpoint to fetch projects by SDG number, department, and academic year
router.get('/:sdgNumber', getProjectsBySDG);

module.exports = router;
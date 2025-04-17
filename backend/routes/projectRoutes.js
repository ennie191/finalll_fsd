const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getAllProjects, getProjectById, createProject } = require("../controllers/projectController");
const projects = require('../data/sampleprojects.json'); // Import the sample projects

const router = express.Router();

router.get("/", getAllProjects);
router.get("/:id", authMiddleware, getProjectById);
router.post("/", authMiddleware, createProject);

// Endpoint to fetch projects by SDG number, department, and academic year
router.get('/:sdgNumber', (req, res) => {
  const { sdgNumber } = req.params;
  const { department, academicYear } = req.query;

  // Filter projects by SDG number
  let filteredProjects = projects.filter((project) =>
    project.sdgs.includes(parseInt(sdgNumber))
  );

  // Apply department filter if provided
  if (department) {
    filteredProjects = filteredProjects.filter((project) => project.department === department);
  }

  // Apply academic year filter if provided
  if (academicYear) {
    filteredProjects = filteredProjects.filter((project) => project.academicYear === academicYear);
  }

  // Return the filtered projects
  res.json(filteredProjects);
});

module.exports = router;
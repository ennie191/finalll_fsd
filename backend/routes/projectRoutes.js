const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { getAllProjects, getProjectById, createProject } = require("../controllers/projectController");

const router = express.Router();

router.get("/", authMiddleware, getAllProjects);
router.get("/:id", authMiddleware, getProjectById);
router.post("/", authMiddleware, createProject);

module.exports = router;
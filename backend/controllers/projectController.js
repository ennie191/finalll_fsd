// filepath: /Users/eeshanithakur/Desktop/finalll_fsd/backend/controllers/projectController.js
const Project = require("../models/Project");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("owner", "name email");
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// Fetch projects by SDG
exports.getProjectsBySDG = async (req, res) => {
  try {
    const { sdg } = req.params; // Get the SDG from the request parameters
    const projects = await Project.find({ sdgs: sdg }); // Find projects with the matching SDG
    if (!projects.length) {
      return res.status(404).json({ message: "No projects found for the selected SDG" });
    }
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
exports.getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate("owner", "name email");
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


exports.createProject = async (req, res) => {
  try {
    const { title, description, department, sdg, academicYear, mentor } = req.body;

    if (!title || !department || !sdg || !academicYear) {
      return res.status(400).json({ message: "Title, Department, SDG, and Academic Year are required" });
    }

    // Hardcoded user ID for the owner
    const hardcodedOwnerId = "64ffd05537538308fc7f9191"; // Replace with a valid user ID from your database

    const project = await Project.create({
      title,
      description,
      department,
      sdg,
      academicYear,
      mentor,
      owner: hardcodedOwnerId, // Use the hardcoded user ID
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
    
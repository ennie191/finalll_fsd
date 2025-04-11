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
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const project = await Project.create({
      title,
      description,
      owner: req.user._id,
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
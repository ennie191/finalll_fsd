const Project = require("../models/Project");


exports.getPendingProjects = async (req, res) => {
    try {
      const projects = await Project.find({ status: "Pending" }); // Fetch only pending projects
      return res.status(200).json(projects);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

// Update project status using POST
exports.updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.body; // Get project ID from the request body
    const { status } = req.body; // Get status from the request body

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const project = await Project.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    return res.status(200).json({ message: `Project ${status.toLowerCase()} successfully`, project });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
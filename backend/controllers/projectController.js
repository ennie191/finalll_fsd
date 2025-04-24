// filepath: /Users/eeshanithakur/Desktop/finalll_fsd/backend/controllers/projectController.js
const Project = require("../models/Project");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("owner", "name email");
    console.log("Fetched Projects:", projects);
    return res.status(200).json(projects);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const { _id } = req.params;
    const project = await Project.findById(_id).populate("owner", "name email");
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
    const { title, description, department, sdgs, academicYear, mentor } = req.body;

    if (!title || !department || !sdgs || !academicYear) {
      return res.status(400).json({ message: "Title, Department, SDGs, and Academic Year are required" });
    }

    // Hardcoded user ID for the owner
    const hardcodedOwnerId = "6800e357fb69aeea30cb3ae3"; // Replace with a valid user ID from your database

    const project = await Project.create({
      title,
      description,
      department,
      sdgs, // Changed from sdg to sdgs to match the model
      academicYear,
      mentor,
      owner: hardcodedOwnerId, // Use the hardcoded user ID
      status: "Pending", // Default status is "Pending"
    });

    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
    
exports.getProjectsBySDG = async (req, res) => {
  console.log("Fetching projects by SDG number...");
  const { sdgNumber } = req.params;
  console.log("SDG Number:", sdgNumber); // Log the SDG number for debugging
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
};
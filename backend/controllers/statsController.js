const Project = require("../models/Project");
const User = require("../models/User");
const CollaborationRequest = require("../models/CollaborationRequest");

exports.getStats = async (req, res) => {
  try {
    const projectCount = await Project.countDocuments();
    const collaboratorCount = await User.countDocuments({ role: "collaborator" });
    const pendingRequestCount = await CollaborationRequest.countDocuments({ status: "pending" });

    return res.status(200).json({
      projectCount,
      collaboratorCount,
      pendingRequestCount,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const Project = require("../models/Project");

// For students requesting collaborators
exports.requestCollaboration = async (req, res) => {
  try {
    const { projectId, message } = req.body;
    const studentId = "6800e357fb69aeea30cb3ae3"; // Hardcoded student ID
    const collaboratorId = "6800e357fb69aeea30cb3ae4"; // Hardcoded collaborator ID

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const existingRequest = project.collaborationRequests.find(
      request => request.studentId.toString() === studentId &&
                request.collaboratorId.toString() === collaboratorId
    );
    
    if (existingRequest) {
      return res.status(400).json({ message: "Request already exists" });
    }

    project.collaborationRequests.push({
      studentId,
      collaboratorId,
      message,
      status: "Pending"
    });

    await project.save();
    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get collaboration requests for collaborator
exports.getCollaborationRequests = async (req, res) => {
  try {
    const collaboratorId = "6800e357fb69aeea30cb3ae4";

    const projects = await Project.find({
      'collaborationRequests.collaboratorId': collaboratorId
    }).populate('owner', 'name email')
      .populate('collaborationRequests.studentId', 'name email');

    const requests = projects.flatMap(project => 
      project.collaborationRequests
        .filter(req => req.collaboratorId.toString() === collaboratorId)
        .map(request => ({
          _id: request._id,
          projectId: project._id,
          projectTitle: project.title,
          studentId: request.studentId._id,
          studentName: request.studentId.name,
          message: request.message,
          status: request.status,
          createdAt: request.createdAt
        }))
    );

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Update collaboration request status
exports.updateCollaborationRequest = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, studentId } = req.body;
    const collaboratorId = "6800e357fb69aeea30cb3ae4";

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const requestIndex = project.collaborationRequests.findIndex(
      request => 
        request.studentId.toString() === studentId &&
        request.collaboratorId.toString() === collaboratorId
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: "Request not found" });
    }

    project.collaborationRequests[requestIndex].status = status;
    await project.save();
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const Project = require("../models/Project");

exports.getMentorshipRequests = async (req, res) => {
  try {
    const projects = await Project.find({
      'mentorshipRequests.0': { $exists: true }
    }).populate('owner', 'email');
    
    const requests = projects.flatMap(project => 
      project.mentorshipRequests.map(request => ({
        _id: request._id,
        projectId: project._id,
        projectTitle: project.title,
        mentorId: request.mentorId,
        status: request.status,
        createdAt: request.createdAt
      }))
    );

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.requestMentorship = async (req, res) => {
  try {
    const { projectId } = req.body;
    const mentorId = "6800e357fb69aeea30cb3ae2";

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const existingRequest = project.mentorshipRequests.find(
      request => request.mentorId.toString() === mentorId
    );
    if (existingRequest) {
      return res.status(400).json({ message: "Request already exists" });
    }

    project.mentorshipRequests.push({
      mentorId,
      status: "Pending",
      createdAt: new Date()
    });

    await project.save();
    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateMentorshipRequest = async (req, res) => {
  try {
    const { projectId, status } = req.body;
    console.log("Project ID" ,projectId)
    const mentorId = "6800e357fb69aeea30cb3ae2";

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const requestIndex = project.mentorshipRequests.findIndex(
      request => request.mentorId.toString() === mentorId
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: "Request not found" });
    }

    project.mentorshipRequests[requestIndex].status = status;

    if (status === "Approved") {
      project.mentors.push(mentorId);
    }

    await project.save();
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
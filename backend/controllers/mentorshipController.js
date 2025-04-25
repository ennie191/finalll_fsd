const Project = require("../models/Project");

// For mentors requesting to admin
exports.requestMentorship = async (req, res) => {
  try {
    const { projectId } = req.body;
    const mentorId = "6800e357fb69aeea30cb3ae2"; // Hardcoded mentor ID

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
      status: "Pending"
    });

    await project.save();
    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// For students requesting mentors
exports.requestMentorshipFromStudent = async (req, res) => {
  try {
    const { projectId, mentorId, message } = req.body;
    const studentId = "6800e357fb69aeea30cb3ae3"; // Hardcoded student ID

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const existingRequest = project.studentMentorshipRequests.find(
      request => request.studentId.toString() === studentId && 
                request.mentorId.toString() === mentorId
    );
    if (existingRequest) {
      return res.status(400).json({ message: "Request already exists" });
    }

    project.studentMentorshipRequests.push({
      studentId,
      mentorId,
      message,
      status: "Pending"
    });

    await project.save();
    return res.status(201).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get all mentor requests for admin
exports.getMentorshipRequests = async (req, res) => {
  try {
    const projects = await Project.find({
      'mentorshipRequests.0': { $exists: true }
    }).populate('mentorshipRequests.mentorId', 'name email');

    const requests = projects.flatMap(project => 
      project.mentorshipRequests.map(request => ({
        _id: request._id,
        projectId: project._id,
        projectTitle: project.title,
        mentorId: request.mentorId._id,
        mentorName: request.mentorId.name,
        mentorEmail: request.mentorId.email,
        status: request.status,
        createdAt: request.createdAt
      }))
    );

    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// Get student requests for specific mentor
exports.getStudentRequests = async (req, res) => {
  try {
    const mentorId = "6800e357fb69aeea30cb3ae2"; // Hardcoded mentor ID

    const projects = await Project.find({
      'studentMentorshipRequests': {
        $elemMatch: {
          mentorId: mentorId
        }
      }
    }).populate('studentMentorshipRequests.studentId', 'name email')
      .populate('owner', 'name email');

    const requests = projects.flatMap(project => 
      project.studentMentorshipRequests
        .filter(req => req.mentorId.toString() === mentorId)
        .map(request => ({
          _id: request._id,
          projectId: project._id,
          projectTitle: project.title,
          studentId: request.studentId._id,
          studentName: request.studentId.name,
          studentEmail: request.studentId.email,
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

// Admin updating mentor request
// Admin updating mentor request
exports.updateMentorshipRequest = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, mentorId } = req.body;

    console.log('Updating request:', { projectId, mentorId, status });

    const project = await Project.findOne({
      _id: projectId,
      'mentorshipRequests.mentorId': mentorId
    });

    if (!project) {
      return res.status(404).json({ 
        message: "Project or request not found",
        details: { projectId, mentorId }
      });
    }

    // Find the specific request
    const requestIndex = project.mentorshipRequests.findIndex(
      request => request.mentorId.toString() === mentorId.toString()
    );

    if (requestIndex === -1) {
      return res.status(404).json({ 
        message: "Mentorship request not found",
        details: { projectId, mentorId }
      });
    }

    // Update the status
    project.mentorshipRequests[requestIndex].status = status;

    // If approved, add mentor to project
    if (status === "Approved") {
      if (!project.mentors.includes(mentorId)) {
        project.mentors.push(mentorId);
      }
    }

    await project.save();

    // Return the updated request
    return res.status(200).json({
      message: "Request updated successfully",
      project: {
        _id: project._id,
        title: project.title,
        mentorshipRequest: project.mentorshipRequests[requestIndex]
      }
    });

  } catch (error) {
    console.error('Error in updateMentorshipRequest:', error);
    return res.status(500).json({ 
      message: "Failed to update request",
      error: error.message 
    });
  }
};

// Update handleMentorshipAction in AdminDashboard.jsx

// Mentor updating student request
exports.updateStudentRequest = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { status, studentId } = req.body;
    const mentorId = "6800e357fb69aeea30cb3ae2"; // Hardcoded mentor ID

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    const requestIndex = project.studentMentorshipRequests.findIndex(
      request => 
        request.studentId.toString() === studentId &&
        request.mentorId.toString() === mentorId
    );

    if (requestIndex === -1) {
      return res.status(404).json({ message: "Request not found" });
    }

    project.studentMentorshipRequests[requestIndex].status = status;
    await project.save();
    return res.status(200).json(project);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
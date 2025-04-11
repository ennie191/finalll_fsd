const CollaborationRequest = require("../models/CollaborationRequest");

exports.getAllCollaborationRequests = async (req, res) => {
  try {
    const requests = await CollaborationRequest.find()
      .populate("project", "title")
      .populate("collaborator", "name email");
    return res.status(200).json(requests);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createCollaborationRequest = async (req, res) => {
  try {
    const { projectId, collaboratorId } = req.body;

    if (!projectId || !collaboratorId) {
      return res.status(400).json({ message: "Project ID and Collaborator ID are required" });
    }

    const request = await CollaborationRequest.create({
      project: projectId,
      collaborator: collaboratorId,
    });

    return res.status(201).json(request);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateCollaborationRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedRequest = await CollaborationRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Collaboration request not found" });
    }

    return res.status(200).json(updatedRequest);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
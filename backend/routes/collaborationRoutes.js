const express = require("express");
const { createCollaborationRequest } = require("../controllers/collaborationController");
const CollaborationRequest = require("../models/CollaborationRequest");
const router = express.Router();

// Route to create a collaboration request
router.post("/", createCollaborationRequest);

// Get all collaboration requests
router.get("/", async (req, res) => {
  try {
    const requests = await CollaborationRequest.find();
    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update collaboration request status
router.patch("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const request = await CollaborationRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
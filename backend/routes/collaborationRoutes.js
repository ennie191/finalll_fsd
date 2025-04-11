const express = require("express");
const {
  getAllCollaborationRequests,
  createCollaborationRequest,
  updateCollaborationRequestStatus,
} = require("../controllers/collaborationController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware, getAllCollaborationRequests); // Get all collaboration requests
router.post("/", authMiddleware, createCollaborationRequest); // Create a collaboration request
router.put("/:id", authMiddleware, updateCollaborationRequestStatus); // Update collaboration request status

module.exports = router; // Export the router
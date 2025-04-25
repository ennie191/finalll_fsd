const express = require("express");
const router = express.Router();
const { 
  requestCollaboration,
  getCollaborationRequests,
  updateCollaborationRequest
} = require("../controllers/collaborationController");

router.post("/request", requestCollaboration);
router.get("/requests", getCollaborationRequests);
router.put("/update/:projectId", updateCollaborationRequest);

module.exports = router;
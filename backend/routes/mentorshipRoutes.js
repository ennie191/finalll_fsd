const express = require("express");
const router = express.Router();
const { 
  requestMentorship,
  requestMentorshipFromStudent,
  getMentorshipRequests,
  getStudentRequests,
  updateMentorshipRequest,
  updateStudentRequest
} = require("../controllers/mentorshipController");

// Mentor to Admin routes
router.post("/request", requestMentorship);
router.get("/requests", getMentorshipRequests);
router.put("/update/:projectId", updateMentorshipRequest);

// Student to Mentor routes
router.post("/student-request", requestMentorshipFromStudent);
router.get("/student-requests", getStudentRequests);
router.put("/student-update/:projectId", updateStudentRequest);

module.exports = router;
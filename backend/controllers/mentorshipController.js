const express = require("express");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { requestMentorship, updateMentorshipStatus, getMentorshipRequests } = require("../controllers/mentorshipController");

const router = express.Router();

// Student requests mentorship
router.post("/request", authMiddleware, requestMentorship);

// Mentor updates mentorship status
router.put("/:id/status", authMiddleware, updateMentorshipStatus);

// Mentor fetches all mentorship requests
router.get("/", authMiddleware, getMentorshipRequests);

module.exports = router;
const express = require("express");
const router = express.Router();
const { requestMentorship, getMentorshipRequests, updateMentorshipRequest } = require("../controllers/mentorshipController");

router.post("/request", requestMentorship);
router.get("/requests", getMentorshipRequests);
router.put("/update/:id", updateMentorshipRequest);

module.exports = router;
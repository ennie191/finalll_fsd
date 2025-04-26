const express = require("express");
const router = express.Router();
const { getAllMentors, getMentorById } = require("../controllers/mentorController");

router.get("/", getAllMentors);
router.get("/:id", getMentorById);

module.exports = router;
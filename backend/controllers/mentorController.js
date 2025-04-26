const Mentor = require("../models/Mentor");

exports.getAllMentors = async (req, res) => {
  try {
    const mentors = await Mentor.find({ status: 'Active' });
    return res.status(200).json(mentors);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getMentorById = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.id);
    if (!mentor) {
      return res.status(404).json({ message: "Mentor not found" });
    }
    return res.status(200).json(mentor);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
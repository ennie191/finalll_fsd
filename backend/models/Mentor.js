const mongoose = require("mongoose");

const mentorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  designation: { type: String, required: true },
  domain: { type: String, required: true },
  expertise: [String],
  projects: [String],
  achievements: [String],
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, { timestamps: true });

module.exports = mongoose.model("Mentor", mentorSchema);
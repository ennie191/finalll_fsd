const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  department: { type: String },
  sdgs: { type: [String] },
  academicYear: { type: String },
  status: { type: String, default: "Pending" },
  mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  // For mentor requesting to admin
  mentorshipRequests: [{
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
  }],
  // For student requesting to mentor
  studentMentorshipRequests: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: String,
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now }
  }]
});

module.exports = mongoose.model("Project", projectSchema);
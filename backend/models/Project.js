const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  // projectId: { type: String, required: [true, "Project ID is required"],autoincrement: true },
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  department: { type: String },
  sdgs: { type: [String] },  // Array of strings
  mentors: { type: [String] }, // Array of strings
  academicYear: { type: String },
  status: { type: String, default: "Pending" }, // Default status is "Pending"
});

module.exports = mongoose.model("Project", projectSchema);
const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  department: { type: String },
  sdg: { type: String },
  academicYear: { type: String },
  mentor: { type: String },
  status: { type: String, default: "Pending" }, // Default status is "Pending"
});

module.exports = mongoose.model("Project", projectSchema);
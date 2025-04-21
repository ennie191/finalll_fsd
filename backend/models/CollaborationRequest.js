const mongoose = require("mongoose");

const collaborationRequestSchema = new mongoose.Schema({
  collaboratorName: { type: String, required: true },
  email: { type: String, required: true },
  organization: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, default: "Pending" }, // Pending, Approved, Rejected
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("CollaborationRequest", collaborationRequestSchema);
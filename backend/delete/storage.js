const mongoose = require("mongoose");

// Define user schema with validation
const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is required"] },
  email: { type: String, required: [true, "Email is required"], unique: true },
  password: { type: String, required: [true, "Password is required"] },
});

// Define project schema with validation
const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// Define collaboration request schema with validation
const collaborationRequestSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
  collaborator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

// Export models
const User = mongoose.model("User", userSchema);
const Project = mongoose.model("Project", projectSchema);
const CollaborationRequest = mongoose.model(
  "CollaborationRequest",
  collaborationRequestSchema
);

// Database operations

// User operations
async function getUserByEmail(email) {
  return User.findOne({ email });
}

async function getUserById(id) {
  return User.findById(id);
}

async function createUser(userData) {
  const user = new User(userData);
  return user.save();
}

// Project operations
async function getAllProjects() {
  return Project.find().populate("owner");
}

async function getProjectById(id) {
  return Project.findById(id).populate("owner");
}

async function insertProject(projectData) {
  const project = new Project(projectData);
  return project.save();
}

// Collaboration request operations
async function getAllCollaborationRequests() {
  return CollaborationRequest.find().populate("project collaborator");
}

async function insertCollaborationRequest(requestData) {
  const request = new CollaborationRequest(requestData);
  return request.save();
}

async function updateCollaborationRequestStatus(id, status) {
  return CollaborationRequest.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
}

// Export functions
module.exports = {
  User,
  Project,
  CollaborationRequest,
  getUserByEmail,
  getUserById,
  createUser,
  getAllProjects,
  getProjectById,
  insertProject,
  getAllCollaborationRequests,
  insertCollaborationRequest,
  updateCollaborationRequestStatus,
};
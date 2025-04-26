const mongoose = require("mongoose");

const collaboratorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String, required: true },
  type: { type: String, required: true },
  projects: [String],
  status: { 
    type: String, 
    enum: ['Active', 'Inactive'], 
    default: 'Active' 
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Collaborator", collaboratorSchema);
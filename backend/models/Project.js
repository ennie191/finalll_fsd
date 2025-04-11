const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: { type: String, required: [true, "Title is required"] },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.model("Project", projectSchema);
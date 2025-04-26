const Collaborator = require("../models/Collaborators");

exports.getAllCollaborators = async (req, res) => {
  try {
    const collaborators = await Collaborator.find({ status: 'Active' });
    return res.status(200).json(collaborators);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getCollaboratorById = async (req, res) => {
  try {
    const collaborator = await Collaborator.findById(req.params.id);
    if (!collaborator) {
      return res.status(404).json({ message: "Collaborator not found" });
    }
    return res.status(200).json(collaborator);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.createCollaborator = async (req, res) => {
  try {
    const collaborator = await Collaborator.create(req.body);
    return res.status(201).json(collaborator);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateCollaborator = async (req, res) => {
  try {
    const collaborator = await Collaborator.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!collaborator) {
      return res.status(404).json({ message: "Collaborator not found" });
    }
    return res.status(200).json(collaborator);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
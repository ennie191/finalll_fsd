const express = require("express");
const router = express.Router();
const {
  getAllCollaborators,
  getCollaboratorById,
  createCollaborator,
  updateCollaborator
} = require("../controllers/control");

router.get("/", getAllCollaborators);
router.get("/:id", getCollaboratorById);
router.post("/", createCollaborator);
router.put("/:id", updateCollaborator);

module.exports = router;
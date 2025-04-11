const { createServer } = require("http");
const { storage } = require("./storage");
const {
  authMiddleware,
  adminMiddleware,
  collaboratorMiddleware,
  registerAuthRoutes
} = require("./auth");

async function registerRoutes(app) {
  // 1. Auth routes
  registerAuthRoutes(app);

  // 2. Get all collaborators (admin only)
  app.get("/api/collaborators", authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const collaborators = await storage.getAllCollaborators();
      res.status(200).json(collaborators);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // 3. Get all projects
  app.get("/api/projects", authMiddleware, async (req, res) => {
    try {
      const projects = await storage.getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // 4. Get a project by ID
  app.get("/api/projects/:id", authMiddleware, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const project = await storage.getProjectById(id);
      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // 5. Add a new project
  app.post("/api/projects", authMiddleware, async (req, res) => {
    const { title, description, owner } = req.body;

    // Basic validation
    if (!title || typeof title !== "string") {
      return res.status(400).json({ error: "Title is required and must be a string." });
    }
    if (!owner || typeof owner !== "string") {
      return res.status(400).json({ error: "Owner is required and must be a string." });
    }

    try {
      const project = await storage.insertProject({ title, description, owner });
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // 6. Add a collaboration request
  app.post("/api/collaboration-requests", authMiddleware, async (req, res) => {
    const { projectId, collaboratorId } = req.body;

    // Basic validation
    if (!projectId || typeof projectId !== "string") {
      return res.status(400).json({ error: "Project ID is required and must be a string." });
    }
    if (!collaboratorId || typeof collaboratorId !== "string") {
      return res.status(400).json({ error: "Collaborator ID is required and must be a string." });
    }

    try {
      const collaborationRequest = await storage.insertCollaborationRequest({
        projectId,
        collaboratorId
      });
      res.status(201).json(collaborationRequest);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // 7. Get all collaboration requests
  app.get("/api/collaboration-requests", authMiddleware, async (req, res) => {
    try {
      const requests = await storage.getAllCollaborationRequests();
      res.status(200).json(requests);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // 8. Update a collaboration request status
  app.put("/api/collaboration-requests/:id", authMiddleware, adminMiddleware, async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    // Basic validation
    if (!status || !["pending", "accepted", "rejected"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    try {
      const updatedRequest = await storage.updateCollaborationRequestStatus(id, status);
      if (!updatedRequest) {
        return res.status(404).json({ message: "Collaboration request not found." });
      }
      res.status(200).json(updatedRequest);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // 9. Delete a project
  app.delete("/api/projects/:id", authMiddleware, adminMiddleware, async (req, res) => {
    const { id } = req.params;

    try {
      const deletedProject = await storage.deleteProject(id);
      if (!deletedProject) {
        return res.status(404).json({ message: "Project not found." });
      }
      res.status(200).json({ message: "Project deleted successfully." });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // 10. Statistics route
  app.get("/api/stats", authMiddleware, adminMiddleware, async (req, res) => {
    try {
      const projectCount = await storage.getProjectCount();
      const collaboratorCount = await storage.getCollaboratorCount();
      const pendingRequestCount = await storage.getPendingRequestCount();

      res.status(200).json({ projectCount, collaboratorCount, pendingRequestCount });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  return createServer(app);
}

module.exports = { registerRoutes };
exports.adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Admin role required." });
    }
  };
  
  exports.collaboratorMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "collaborator") {
      next();
    } else {
      return res.status(403).json({ message: "Access denied. Collaborator role required." });
    }
  };
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { storage } = require("./storage");

// JWT Secret should be in environment variables in production
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_EXPIRES_IN = "7d";

// Hash a plain text password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare a plain text password with a hashed one
async function comparePasswords(plain, hashed) {
  return bcrypt.compare(plain, hashed);
}

// Generate JWT
function generateToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });
}

// Verify JWT
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Middleware to check if request has a valid token
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await storage.getUserById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Authentication failed" });
  }
};

// Middleware for admin-only routes
const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admin role required." });
  }
};

// Middleware for collaborator-only routes
const collaboratorMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "collaborator") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Collaborator role required." });
  }
};

// Auth routes
function registerAuthRoutes(app) {
  app.post("/api/register", async (req, res) => {
    try {
      const { name, email, password, role } = req.body;

      const existingUser = await storage.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }

      const hashedPassword = await hashPassword(password);

      const user = await storage.createUser({
        name,
        email,
        password: hashedPassword,
        role
      });

      const token = generateToken(user);
      const { password: _, ...userWithoutPassword } = user;

      return res.status(201).json({
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const { email, password } = req.body;

      const user = await storage.getUserByEmail(email);
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const isMatch = await comparePasswords(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const token = generateToken(user);
      const { password: _, ...userWithoutPassword } = user;

      return res.status(200).json({
        user: userWithoutPassword,
        token
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.post("/api/logout", (req, res) => {
    try {
      // With JWT, logout is handled on the client by deleting the token
      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/me", authMiddleware, (req, res) => {
    const { password, ...userWithoutPassword } = req.user;
    return res.status(200).json(userWithoutPassword);
  });

  app.get("/api/user", authMiddleware, (req, res) => {
    const { password, ...userWithoutPassword } = req.user;
    return res.status(200).json(userWithoutPassword);
  });
}

module.exports = {
  authMiddleware,
  adminMiddleware,
  collaboratorMiddleware,
  registerAuthRoutes,
  hashPassword,
  comparePasswords,
  generateToken,
  verifyToken
};

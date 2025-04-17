const express = require('express');
const router = express.Router();

// Simulated user data
const users = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'mentor@example.com', password: 'mentor123', role: 'mentor' },
  { email: 'student@example.com', password: 'student123', role: 'student' },
  { email: 'collaborator@example.com', password: 'collab123', role: 'collaborator' },
];

// Login endpoint
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Send user data back to the frontend
  res.status(200).json({ message: 'Login successful', user });
});

module.exports = router;
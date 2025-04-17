const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const projects = require('./data/sampleprojects.json'); // Corrected path

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Simulated user data
const users = [
  { email: 'admin@example.com', password: 'admin123', role: 'admin' },
  { email: 'mentor@example.com', password: 'mentor123', role: 'mentor' },
  { email: 'student@example.com', password: 'student123', role: 'student' },
  { email: 'collaborator@example.com', password: 'collab123', role: 'collaborator' },
];

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  // Send user data back to the frontend
  res.status(200).json({ message: 'Login successful', user });
});

// Endpoint to fetch projects by SDG number, department, and academic year
app.get('/api/projects/:sdgNumber', (req, res) => {
  const { sdgNumber } = req.params;
  const { department, academicYear } = req.query;

  // Filter projects by SDG number
  let filteredProjects = projects.filter((project) =>
    project.sdgs.includes(parseInt(sdgNumber))
  );

  // Apply department filter if provided
  if (department) {
    filteredProjects = filteredProjects.filter((project) => project.department === department);
  }

  // Apply academic year filter if provided
  if (academicYear) {
    filteredProjects = filteredProjects.filter((project) => project.academicYear === academicYear);
  }

  // Return the filtered projects
  res.json(filteredProjects);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
import React, { useState, useEffect } from "react";
import { FaPlus, FaLaptopCode, FaClipboardList } from "react-icons/fa";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    department: "",
    sdgs: [], // Changed name from sdg to sdgs to match backend schema
    academicYear: "",
    mentor: "",
  });
  const [showForm, setShowForm] = useState(false);

  const loggedInUserId = "6800e357fb69aeea30cb3ae3"; // Replace with dynamic value if needed

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        const data = await response.json();
        const userProjects = data.filter(
          (project) => project.owner && project.owner._id === loggedInUserId
        );
        setProjects(userProjects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, [loggedInUserId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for SDGs field to convert comma-separated string to array
    if (name === "sdgs") {
      const sdgsArray = value.split(",").map(item => item.trim()).filter(item => item !== "");
      setNewProject({ ...newProject, [name]: sdgsArray });
    } else {
      setNewProject({ ...newProject, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProject),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      const createdProject = await response.json();
      setProjects([...projects, createdProject]);
      setShowForm(false);
      setNewProject({
        title: "",
        description: "",
        department: "",
        sdgs: [], // Reset to empty array with correct field name
        academicYear: "",
        mentor: "",
      });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="neuro-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="glow-text">Student Dashboard</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="neuro-button"
          >
            <FaPlus className="button-icon" /> New Project
          </button>
        </div>

        {/* New Project Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="neuro-form">
            <h2 className="form-title glow-text">Create New Project</h2>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={newProject.title}
                onChange={handleInputChange}
                className="neuro-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={newProject.description}
                onChange={handleInputChange}
                className="neuro-input"
                rows="4"
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <select
                  name="department"
                  value={newProject.department}
                  onChange={handleInputChange}
                  className="neuro-input"
                  required
                >
                  <option value="">Select Department</option>
                  <option value="Computer Engineering">Computer Engineering</option>
                  <option value="AI & DS">AI & DS</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Electronics and Computer Science">Electronics and Computer Science</option>
                </select>
              </div>

              <div className="form-group">
                <label>SDGs (Comma-separated values)</label>
                <select
                  name="sdgs"
                  value={newProject.sdgs.join(", ")}
                  onChange={handleInputChange}
                  className="neuro-input"
                  placeholder="e.g. No Poverty, Zero Hunger, Quality Education"
                required
                >
                  <option value="">Select SDG</option>
                  <option value="SDG 1 - No Poverty">SDG 1 - No Poverty</option>
                  <option value="SDG 2 - Zero Hunger">SDG 2 - Zero Hunger</option>
                  <option value="SDG 3 - Good Health and Well-being">SDG 3 - Good Health and Well-being</option>
                  <option value="SDG 4 - Quality Education">SDG 4 - Quality Education</option>
                  <option value="SDG 5 - Gender Equality">SDG 5 - Gender Equality</option>
                  <option value="SDG 6 - Clean Water and Sanitation">SDG 6 - Clean Water and Sanitation</option>
                  <option value="SDG 7 - Affordable and Clean Energy">SDG 7 - Affordable and Clean Energy</option>
                  <option value="SDG 8 - Decent Work and Economic Growth">SDG 8 - Decent Work and Economic Growth</option>
                  <option value="SDG 9 - Industry, Innovation and Infrastructure">SDG 9 - Industry, Innovation and Infrastructure</option>
                  <option value="SDG 10 - Reduced Inequality">SDG 10 - Reduced Inequality</option>
                  <option value="SDG 11 - Sustainable Cities and Communities">SDG 11 - Sustainable Cities and Communities</option>
                  <option value="SDG 12 - Responsible Consumption and Production">SDG 12 - Responsible Consumption and Production</option>
                  <option value="SDG 13 - Climate Action">SDG 13 - Climate Action</option>
                  <option value="SDG 14 - Life Below Water">SDG 14 - Life Below Water</option>
                  <option value="SDG 15 - Life on Land">SDG 15 - Life on Land</option>
                  <option value="SDG 16 - Peace, Justice and Strong Institutions">SDG 16 - Peace, Justice and Strong Institutions</option>
                  <option value="SDG 17 - Partnerships for the Goals">SDG 17 - Partnerships for the Goals</option>  
                </select>
              </div>
              <small className="text-gray-500">Enter SDGs separated by commas</small>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Academic Year</label>
                <select
                  name="academicYear"
                  value={newProject.academicYear}
                  onChange={handleInputChange}
                  className="neuro-input"
                  required
                >
                  <option value="">Select Academic Year</option>
                  <option value="2022-2023">2022-2023</option>
                  <option value="2023-2024">2023-2024</option>
                  <option value="2024-2025">2024-2025</option>
                  <option value="2025-2026">2025-2026</option>
                </select>
              </div>

              <div className="form-group">
                <label>Mentor</label>
                <input
                  type="text"
                  name="mentor"
                  value={newProject.mentor}
                  onChange={handleInputChange}
                  className="neuro-input"
                />
              </div>
            </div>

            <button type="submit" className="neuro-button submit-button">
              Submit Project
            </button>
          </form>
        )}

        {/* My Projects */}
        <div className="projects-section">
          <div className="section-header">
            <FaClipboardList className="section-icon" />
            <h2 className="glow-text">My Projects</h2>
          </div>

          <div className="projects-grid">
            {projects.length > 0 ? (
              projects.map((project) => (
                <div key={project._id} className="project-card">
                  <div className="card-header">
                    <h3>{project.title}</h3>
                    <span className="status-badge">{project.status || "Active"}</span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-details">
                    <div className="detail-item">
                      <span className="detail-label">Department</span>
                      <span className="detail-value">{project.department}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">SDG</span>
                      <span className="detail-value">{project.sdg}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Academic Year</span>
                      <span className="detail-value">{project.academicYear}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Mentor</span>
                      <span className="detail-value">{project.mentor || "Not Assigned"}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <FaLaptopCode className="empty-icon" />
                <p>You don't have any projects yet. Create your first project!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
import React, { useState, useEffect } from "react";
import { 
  FaPlus, 
  FaLaptopCode, 
  FaClipboardList, 
  FaBars, 
  FaTimes, 
  FaFileUpload, 
  FaComments, 
  FaHandshake, 
  FaUserTie, 
  FaHome,
  FaFile,
  FaFileAlt
} from "react-icons/fa";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    department: "",
    sdgs: [],
    academicYear: "",
    mentor: "",
  });
  const [showForm, setShowForm] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState("dashboard");
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadType, setUploadType] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

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
        sdgs: [],
        academicYear: "",
        mentor: "",
      });
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleUploadButtonClick = (type) => {
    setUploadType(type);
    setShowUploadModal(true);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return;

    // Here you would implement the actual file upload to your server
    // This is a placeholder to show how it might work
    console.log(`Uploading ${uploadType}: ${selectedFile.name}`);
    
    // Simulating an upload success
    setTimeout(() => {
      setShowUploadModal(false);
      setSelectedFile(null);
      alert(`${uploadType} uploaded successfully!`);
    }, 1500);
  };

  const renderMainContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <>
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
          </>
        );
      
      case "uploads":
        return (
          <div className="uploads-section">
            <div className="section-header">
              <FaFileUpload className="section-icon" />
              <h2 className="glow-text">Document Uploads</h2>
            </div>
            
            <div className="uploads-container">
              <div className="upload-options">
                <div className="upload-card" onClick={() => handleUploadButtonClick("Project Documentation")}>
                  <FaFileAlt className="upload-icon" />
                  <h3>Project Documentation</h3>
                  <p>Upload project reports, presentations, and related documents</p>
                </div>
                
                <div className="upload-card" onClick={() => handleUploadButtonClick("Research Paper")}>
                  <FaFile className="upload-icon" />
                  <h3>Research Paper</h3>
                  <p>Upload your research papers and academic publications</p>
                </div>
                
                <div className="upload-card" onClick={() => handleUploadButtonClick("Assignment")}>
                  <FaClipboardList className="upload-icon" />
                  <h3>Assignment</h3>
                  <p>Upload your assignments and project milestones</p>
                </div>
              </div>
              
              <div className="recent-uploads">
                <h3 className="sub-header glow-text">Recent Uploads</h3>
                <div className="empty-state">
                  <FaFileUpload className="empty-icon" />
                  <p>No recent uploads found. Upload your first document!</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "feedback":
        return (
          <div className="feedback-section">
            <div className="section-header">
              <FaComments className="section-icon" />
              <h2 className="glow-text">Mentor Feedback</h2>
            </div>
            
            <div className="feedback-container">
              <div className="empty-state">
                <FaComments className="empty-icon" />
                <p>No feedback received yet. Check back later!</p>
              </div>
            </div>
          </div>
        );
      
      case "mentorship":
        return (
          <div className="mentorship-section">
            <div className="section-header">
              <FaHandshake className="section-icon" />
              <h2 className="glow-text">Request Mentorship</h2>
            </div>
            
            <div className="mentorship-container">
              <form className="neuro-form">
                <div className="form-group">
                  <label>Mentorship Type</label>
                  <select className="neuro-input">
                    <option value="">Select Mentorship Type</option>
                    <option value="industry">Industry Expert</option>
                    <option value="ngo">NGO Representative</option>
                    <option value="academic">Academic Mentor</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Project</label>
                  <select className="neuro-input">
                    <option value="">Select Project</option>
                    {projects.map(project => (
                      <option key={project._id} value={project._id}>{project.title}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Message</label>
                  <textarea 
                    className="neuro-input" 
                    rows="4" 
                    placeholder="Describe why you're seeking mentorship and what you hope to gain..."
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label>Preferred Expertise Areas</label>
                  <select className="neuro-input" multiple>
                    <option value="ai">Artificial Intelligence</option>
                    <option value="sustainability">Sustainability</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="engineering">Engineering</option>
                    <option value="business">Business Development</option>
                  </select>
                  <small className="text-hint">Hold Ctrl/Cmd to select multiple options</small>
                </div>
                
                <button type="submit" className="neuro-button submit-button">
                  Request Mentorship
                </button>
              </form>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="empty-state">
            <FaLaptopCode className="empty-icon" />
            <p>Select an option from the sidebar menu</p>
          </div>
        );
    }
  };

  return (
    <div className="neuro-dashboard">
      {/* Sidebar Toggle Button for Mobile */}
      <button 
        className={`sidebar-toggle ${sidebarOpen ? 'sidebar-open' : ''}`} 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      {/* Sidebar Navigation */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="glow-text">Student Portal</h2>
        </div>
        
        <div className="sidebar-menu">
          <button 
            className={`sidebar-item ${activeSection === 'dashboard' ? 'active' : ''}`} 
            onClick={() => {
              setActiveSection('dashboard');
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            <FaHome className="sidebar-icon" />
            <span>Dashboard</span>
          </button>
          
          <button 
            className={`sidebar-item ${activeSection === 'uploads' ? 'active' : ''}`} 
            onClick={() => {
              setActiveSection('uploads');
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            <FaFileUpload className="sidebar-icon" />
            <span>Upload Documents</span>
          </button>
          
          <button 
            className={`sidebar-item ${activeSection === 'feedback' ? 'active' : ''}`} 
            onClick={() => {
              setActiveSection('feedback');
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            <FaComments className="sidebar-icon" />
            <span>Mentor Feedback</span>
          </button>
          
          <button 
            className={`sidebar-item ${activeSection === 'mentorship' ? 'active' : ''}`} 
            onClick={() => {
              setActiveSection('mentorship');
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            <FaHandshake className="sidebar-icon" />
            <span>Request Mentorship</span>
          </button>
        </div>
        
        <div className="sidebar-footer">
          <button 
            className="neuro-button" 
            onClick={() => {
              setActiveSection('dashboard');
              setShowForm(true);
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            <FaPlus className="button-icon" /> New Project
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="dashboard-container">
          {/* Header */}
          <div className="dashboard-header">
            <h1 className="glow-text">
              {activeSection === 'dashboard' && 'Student Dashboard'}
              {activeSection === 'uploads' && 'Document Uploads'}
              {activeSection === 'feedback' && 'Mentor Feedback'}
              {activeSection === 'mentorship' && 'Request Mentorship'}
            </h1>
            {activeSection === 'dashboard' && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="neuro-button"
              >
                <FaPlus className="button-icon" /> New Project
              </button>
            )}
          </div>
          
          {/* Dynamic Content Based on Active Section */}
          {renderMainContent()}
        </div>
      </div>
      
      {/* Upload Modal */}
      {showUploadModal && (
        <div className="modal-overlay">
          <div className="modal-content neuro-form">
            <div className="modal-header">
              <h2 className="glow-text">Upload {uploadType}</h2>
              <button className="close-button" onClick={() => setShowUploadModal(false)}>
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleFileUpload}>
              <div className="form-group">
                <label>Document Title</label>
                <input type="text" className="neuro-input" required />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea className="neuro-input" rows="3"></textarea>
              </div>
              
              <div className="form-group">
                <label>Select Project</label>
                <select className="neuro-input" required>
                  <option value="">Choose a Project</option>
                  {projects.map(project => (
                    <option key={project._id} value={project._id}>{project.title}</option>
                  ))}
                </select>
              </div>
              
              <div className="upload-area">
                <label htmlFor="file-upload" className="custom-file-upload">
                  <FaFileUpload className="upload-icon" />
                  <span>{selectedFile ? selectedFile.name : "Choose File"}</span>
                </label>
                <input 
                  id="file-upload" 
                  type="file" 
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  required
                />
                <small className="text-hint">Supported formats: PDF, DOC, DOCX, PPT, PPTX</small>
              </div>
              
              <button type="submit" className="neuro-button submit-button">
                Upload Document
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
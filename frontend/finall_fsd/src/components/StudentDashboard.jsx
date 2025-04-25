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
  const [mentors, setMentors] = useState([]);
const [selectedMentor, setSelectedMentor] = useState('');
const [myMentorshipRequests, setMyMentorshipRequests] = useState([]);
const [selectedProject, setSelectedProject] = useState('');
const [mentorshipRequests, setMentorshipRequests] = useState([]);
const [loading, setLoading] = useState(false);
const MENTOR_ID = "6800e357fb69aeea30cb3ae2";
const [collaborationRequests, setCollaborationRequests] = useState([]);
const COLLABORATOR_ID = "6800e357fb69aeea30cb3ae4";

// Add useEffect to fetch collaboration requests
useEffect(() => {
  const fetchCollaborationRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/collaboration/requests');
      const data = await response.json();
      setCollaborationRequests(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchCollaborationRequests();
}, []);

// Add handler for collaboration requests
const handleCollaborationRequest = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('http://localhost:5000/api/collaboration/request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: selectedProject,
        message: e.target.message.value
      })
    });

    if (!response.ok) throw new Error('Failed to send request');
    
    alert('Collaboration request sent successfully!');
    setSelectedProject('');
    e.target.reset();
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send request');
  }
};
// Add useEffect to fetch projects
useEffect(() => {
  const fetchMentors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mentors');
      const data = await response.json();
      setMentors(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchMentors();
}, []);

// Add fetch for student's mentorship requests
useEffect(() => {
  const fetchMyRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mentorship/student-requests');
      const data = await response.json();
      const myRequests = data.filter(req => req.studentId === STUDENT_ID);
      console.log("My Mentorship Requests:", myRequests);
      setMyMentorshipRequests(myRequests);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchMyRequests();
}, []);

// Add request handler
// Add constants at top

// Update handleMentorshipRequest function
const handleMentorshipRequest = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const response = await fetch('http://localhost:5000/api/mentorship/student-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        projectId: selectedProject,
        mentorId: MENTOR_ID,
        message: e.target.message.value
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    alert('Mentorship request sent successfully!');
    setSelectedProject('');
    e.target.reset();
    
    // Refresh requests list
    fetchMentorshipRequests();
  } catch (error) {
    console.error('Error:', error);
    alert(error.message);
  } finally {
    setLoading(false);
  }
};

// Add fetch function for requests
const fetchMentorshipRequests = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/mentorship/student-requests');
    const data = await response.json();
    setMentorshipRequests(data);
  } catch (error) {
    console.error('Error:', error);
  }
};

// Rest of your existing code remains the same

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
    const fetchMentors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mentors');
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      }
    };
    fetchMentors();
  }, []);
  const STUDENT_ID = "6800e357fb69aeea30cb3ae3";

// Add after existing useEffect
useEffect(() => {
  const fetchStudentMentorshipRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mentorship/requests');
      const data = await response.json();
      console.log("Mentorship Requests:", data);
      // Filter requests for this student
      const studentRequests = data.filter(
        request => request.studentId === STUDENT_ID
      );
      setMentorshipRequests(studentRequests);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchStudentMentorshipRequests();
}, []);
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/projects");
        const data = await response.json();
        const userProjects = data.filter(
          (project) => project.owner && project.owner._id === loggedInUserId
        );
        console.log("User Projects:", userProjects);
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
                      <option value="Computer Science">Computer Science</option>
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
                      <option value="1">SDG 1 - No Poverty</option>
                      <option value="2">SDG 2 - Zero Hunger</option>
                      <option value="3">SDG 3 - Good Health and Well-being</option>
                      <option value="4">SDG 4 - Quality Education</option>
                      <option value="5">SDG 5 - Gender Equality</option>
                      <option value="6">SDG 6 - Clean Water and Sanitation</option>
                      <option value="7">SDG 7 - Affordable and Clean Energy</option>
                      <option value="8">SDG 8 - Decent Work and Economic Growth</option>
                      <option value="9">SDG 9 - Industry, Innovation and Infrastructure</option>
                      <option value="10">SDG 10 - Reduced Inequality</option>
                      <option value="11">SDG 11 - Sustainable Cities and Communities</option>
                      <option value="12">SDG 12 - Responsible Consumption and Production</option>
                      <option value="13">SDG 13 - Climate Action</option>
                      <option value="14">SDG 14 - Life Below Water</option>
                      <option value="15">SDG 15 - Life on Land</option>
                      <option value="16">SDG 16 - Peace, Justice and Strong Institutions</option>
                      <option value="17">SDG 17 - Partnerships for the Goals</option>  
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
                          <span className="detail-value">{project.sdgs.join(",")}</span>
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cyan-300">Request Mentorship</h2>
      
      <form onSubmit={handleMentorshipRequest} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-cyan-200 mb-2">Select Project</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full bg-blue-900 p-2 rounded-lg"
            required
          >
            <option value="">Choose a project...</option>
            {projects.map(project => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-200 mb-2">Message</label>
          <textarea
            name="message"
            className="w-full bg-blue-900 p-2 rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>

        <button 
          type="submit" 
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Request Mentorship'}
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-cyan-300 mb-4">My Mentorship Requests</h3>
        <div className="grid gap-4">
          {myMentorshipRequests.map(request => (
            <div key={request._id} className="bg-blue-900 p-4 rounded-xl border border-blue-700">
              <h4 className="font-semibold text-cyan-200">{request.projectTitle}</h4>
              <p className="text-sm text-cyan-300">Message: {request.message}</p>
              <div className="mt-2">
                <span className={`px-2 py-1 rounded-full text-sm ${
                  request.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                  request.status === 'Approved' ? 'bg-green-500/20 text-green-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {request.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  case "collaboration":
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-cyan-300">Request Collaboration</h2>
      
      <form onSubmit={handleCollaborationRequest} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-cyan-200 mb-2">Select Project</label>
          <select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            className="w-full bg-blue-900 p-2 rounded-lg"
            required
          >
            <option value="">Choose a project...</option>
            {projects.map(project => (
              <option key={project._id} value={project._id}>
                {project.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-cyan-200 mb-2">Message</label>
          <textarea
            name="message"
            className="w-full bg-blue-900 p-2 rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>

        <button type="submit" className="bg-cyan-600 text-white px-4 py-2 rounded-lg">
          Send Request
        </button>
      </form>

      {/* Show My Requests */}
      <div className="mt-8">
        <h3 className="text-xl font-bold text-cyan-300 mb-4">My Collaboration Requests</h3>
        <div className="grid gap-4">
          {collaborationRequests.map(request => (
            <div key={request._id} className="bg-blue-900 p-4 rounded-lg">
              <h4 className="font-semibold text-cyan-200">{request.projectTitle}</h4>
              <p className="text-sm text-cyan-300 mt-2">Message: {request.message}</p>
              <span className={`inline-block mt-2 px-2 py-1 rounded-full text-sm ${
                request.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                request.status === 'Approved' ? 'bg-green-500/20 text-green-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {request.status}
              </span>
            </div>
          ))}
        </div>
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

        <button 
            className={`sidebar-item ${activeSection === 'collaboration' ? 'active' : ''}`} 
            onClick={() => {
              setActiveSection('collaboration');
              if (window.innerWidth < 768) setSidebarOpen(false);
            }}
          >
            <FaHandshake className="sidebar-icon" />
            <span>Request Collaboration</span>
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
              {activeSection === 'collaboration' && 'Request collaborators'}
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
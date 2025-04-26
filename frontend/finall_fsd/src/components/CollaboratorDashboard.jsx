import React, { useState,useEffect } from "react";
import { FaUserFriends, FaProjectDiagram, FaBell, FaChartLine, FaCheckCircle, FaTimesCircle, FaUser, FaEdit, FaCertificate, FaLinkedin, FaGithub } from "react-icons/fa";

const CollaboratorDashboard = () => {
  const [activeTab, setActiveTab] = useState("profile");

  // Mock data for collaboration requests
  const [collaborationRequests, setCollaborationRequests] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const COLLABORATOR_ID = "6800e357fb69aeea30cb3ae4";

// Add useEffect to fetch collaboration requests
useEffect(() => {
  const fetchCollaborationRequests = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/collaboration/requests');
      const data = await response.json();
      console.log('Collaboration Requests:', data);
      // Filter requests for this collaborator
      // const collaboratorRequests = data.filter(req => req.collaboratorId === COLLABORATOR_ID);
      setCollaborationRequests(data);
    } catch (err) {
      console.error('Error fetching requests:', err);
      setError('Failed to fetch collaboration requests');
    } finally {
      setLoading(false);
    }
  };

  fetchCollaborationRequests();
}, []);

// Update request handler
const handleRequestAction = async (projectId, studentId, status) => {
  try {
    const response = await fetch(`http://localhost:5000/api/collaboration/update/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        collaboratorId: COLLABORATOR_ID,
        studentId,
        status
      })
    });

    if (!response.ok) throw new Error('Failed to update request');

    // Update local state
    setCollaborationRequests(prev =>
      prev.map(req =>
        req.projectId === projectId && req.studentId === studentId
          ? { ...req, status }
          : req
      )
    );
  } catch (error) {
    console.error('Error:', error);
  }
};

  // Mock data for active collaborations
  const [activeCollaborations, setActiveCollaborations] = useState([
    {
      id: 1,
      projectTitle: "Renewable Energy Monitor",
      teamLead: "Alice Johnson",
      department: "Electronics & Computer Science",
      sdgs: [7, 11],
      progress: 65,
      startDate: "2024-02-01",
      milestones: [
        { id: 1, title: "Initial Planning", completed: true },
        { id: 2, title: "System Design", completed: true },
        { id: 3, title: "Implementation", completed: false },
        { id: 4, title: "Testing", completed: false }
      ],
      teamMembers: ["Alice Johnson", "Bob Wilson", "Carol White"],
      nextMeeting: "2024-03-20"
    },
    {
      id: 2,
      projectTitle: "Water Quality Analysis",
      teamLead: "Bob Wilson",
      department: "Environmental Science",
      sdgs: [6, 14],
      progress: 40,
      startDate: "2024-02-15",
      milestones: [
        { id: 1, title: "Data Collection", completed: true },
        { id: 2, title: "Analysis Framework", completed: false },
        { id: 3, title: "Implementation", completed: false }
      ],
      teamMembers: ["Bob Wilson", "David Brown", "Eva Green"],
      nextMeeting: "2024-03-22"
    }
  ]);

  const [profile, setProfile] = useState({
    name: "Dr. Sarah Johnson",
    title: "Senior Research Collaborator",
    department: "Computer Science & Engineering",
    expertise: ["Machine Learning", "Data Science", "IoT", "Cloud Computing"],
    education: [
      {
        degree: "Ph.D. in Computer Science",
        institution: "Stanford University",
        year: "2018"
      },
      {
        degree: "M.S. in Data Science",
        institution: "MIT",
        year: "2014"
      }
    ],
    certifications: [
      {
        name: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        year: "2023"
      },
      {
        name: "Google Cloud Professional Data Engineer",
        issuer: "Google Cloud",
        year: "2022"
      }
    ],
    stats: {
      projectsCompleted: 15,
      activeCollaborations: 4,
      studentsGuided: 25,
      successRate: 92
    },
    contact: {
      email: "sarah.johnson@university.edu",
      office: "Room 405, Tech Building",
      officeHours: "Mon & Wed 2-4 PM",
      linkedin: "linkedin.com/in/sarahjohnson",
      github: "github.com/sarahjohnson"
    },
    bio: "Experienced researcher and collaborator with over 8 years of experience in guiding student projects. Specialized in machine learning applications and data science solutions for sustainable development."
  });


  const TabButton = ({ name, icon, label }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`flex items-center space-x-2 p-4 w-full transition-all rounded-xl ${
        activeTab === name
          ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/30"
          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "requests":
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-cyan-400 mb-6 drop-shadow-lg shadow-cyan-500/50">
        Collaboration Requests
      </h2>
      
      {loading ? (
        <div className="text-center text-cyan-300">Loading requests...</div>
      ) : error ? (
        <div className="text-center text-red-400">{error}</div>
      ) : collaborationRequests.length === 0 ? (
        <div className="text-center text-cyan-300">No collaboration requests found</div>
      ) : (
        <div className="grid gap-8">
          {collaborationRequests.map((request) => (
            <div key={request._id} className="bg-gray-800 rounded-2xl p-6 shadow-[5px_5px_15px_rgba(9,9,32,0.8),-5px_-5px_15px_rgba(40,60,100,0.15)] border-t border-l border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-cyan-300">{request.projectTitle}</h3>
                  <p className="text-gray-400">Student: {request.studentName}</p>
                  <p className="text-gray-400">Department: {request.department}</p>
                  <p className="mt-4 text-gray-300">{request.message}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    request.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                    request.status === 'Approved' ? 'bg-green-500/20 text-green-300' :
                    'bg-red-500/20 text-red-300'
                  }`}>
                    {request.status}
                  </span>
                  <p className="text-sm text-gray-400 mt-2">
                    Requested: {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {request.status === 'Pending' && (
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleRequestAction(request.projectId, request.studentId, 'Approved')}
                    className="flex items-center gap-1 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-500 shadow-lg shadow-emerald-700/30 transition-all"
                  >
                    <FaCheckCircle className="w-4 h-4" />
                    Accept
                  </button>
                  <button
                    onClick={() => handleRequestAction(request.projectId, request.studentId, 'Rejected')}
                    className="flex items-center gap-1 bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-500 shadow-lg shadow-rose-700/30 transition-all"
                  >
                    <FaTimesCircle className="w-4 h-4" />
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );

      case "activeCollaborations":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6 drop-shadow-lg shadow-cyan-500/50">Active Collaborations</h2>
            <div className="grid gap-8">
              {activeCollaborations.map((project) => (
                <div key={project.id} className="bg-gray-800 rounded-2xl p-6 shadow-[5px_5px_15px_rgba(9,9,32,0.8),-5px_-5px_15px_rgba(40,60,100,0.15)] border-t border-l border-gray-700">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-cyan-300">{project.projectTitle}</h3>
                      <p className="text-gray-400">Team Lead: {project.teamLead}</p>
                      <p className="text-gray-400">Department: {project.department}</p>
                      
                      <div className="flex gap-2 mt-3">
                        {project.sdgs.map((sdg) => (
                          <span key={sdg} className="bg-cyan-900 text-cyan-300 px-3 py-1 rounded-full text-sm shadow-inner shadow-cyan-800/50">
                            SDG {sdg}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">Started: {project.startDate}</p>
                      <p className="text-sm text-gray-400 mt-1">Next Meeting: {project.nextMeeting}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-300 mb-1">
                      <span>Project Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3 shadow-inner">
                      <div
                        className="bg-cyan-500 rounded-full h-3 shadow-lg shadow-cyan-500/50"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 text-gray-200">Milestones</h4>
                    <div className="space-y-2">
                      {project.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center justify-between bg-gray-700 p-3 rounded-lg shadow-inner shadow-black/30">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={milestone.completed}
                              readOnly
                              className="rounded text-cyan-500 bg-gray-600 border-none"
                            />
                            <span className={milestone.completed ? "line-through text-gray-400" : "text-gray-200"}>
                              {milestone.title}
                            </span>
                          </div>
                          <span className={`text-sm ${
                            milestone.completed ? "text-emerald-400" : "text-gray-400"
                          }`}>
                            {milestone.completed ? "Completed" : "In Progress"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3 text-gray-200">Team Members</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.teamMembers.map((member, index) => (
                        <span key={index} className="bg-gray-700 text-cyan-300 px-3 py-1 rounded-full text-sm">
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  
                </div>
              ))}
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-cyan-400 mb-6 drop-shadow-lg shadow-cyan-500/50">Collaboration Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-800 p-6 rounded-2xl shadow-[5px_5px_15px_rgba(9,9,32,0.8),-5px_-5px_15px_rgba(40,60,100,0.15)] border-t border-l border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-cyan-300">Project Distribution</h3>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 shadow-inner shadow-black/30">
                  [Project Distribution Chart]
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl shadow-[5px_5px_15px_rgba(9,9,32,0.8),-5px_-5px_15px_rgba(40,60,100,0.15)] border-t border-l border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-cyan-300">SDG Impact</h3>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 shadow-inner shadow-black/30">
                  [SDG Impact Chart]
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-2xl shadow-[5px_5px_15px_rgba(9,9,32,0.8),-5px_-5px_15px_rgba(40,60,100,0.15)] border-t border-l border-gray-700">
                <h3 className="text-lg font-semibold mb-4 text-cyan-300">Progress Overview</h3>
                <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 shadow-inner shadow-black/30">
                  [Progress Overview Chart]
                </div>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-2xl shadow-[5px_5px_15px_rgba(9,9,32,0.8),-5px_-5px_15px_rgba(40,60,100,0.15)] p-8 border-t border-l border-gray-700">
              {/* Header Section */}
              <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                <div className="flex flex-col md:flex-row items-center md:space-x-6 space-y-4 md:space-y-0">
                  <div className="w-32 h-32 bg-cyan-900 rounded-full flex items-center justify-center shadow-lg shadow-cyan-800/30 border border-cyan-700">
                    <span className="text-4xl font-bold text-cyan-400">
                      DSJ
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-cyan-300 text-center md:text-left">{profile.name}</h2>
                    <p className="text-xl text-gray-300 text-center md:text-left">{profile.title}</p>
                    <p className="text-gray-400 text-center md:text-left">{profile.department}</p>
                    <div className="flex space-x-4 mt-4 justify-center md:justify-start">
                      <a href={profile.contact.linkedin} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                        <FaLinkedin size={24} />
                      </a>
                      <a href={profile.contact.github} className="text-gray-400 hover:text-gray-300 transition-colors">
                        <FaGithub size={24} />
                      </a>
                    </div>
                  </div>
                </div>
                <button className="bg-cyan-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-cyan-500 shadow-lg shadow-cyan-700/30 transition-all self-center md:self-start">
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
                {Object.entries(profile.stats).map(([key, value]) => (
                  <div key={key} className="bg-gray-700 p-4 rounded-xl text-center shadow-inner shadow-black/20">
                    <div className="text-2xl font-bold text-cyan-400">{value}</div>
                    <div className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>

              {/* Bio Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 text-cyan-300">About</h3>
                <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
              </div>

              {/* Expertise Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 text-cyan-300">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((skill, index) => (
                    <span key={index} className="bg-cyan-900 text-cyan-300 px-4 py-2 rounded-full shadow-inner shadow-cyan-800/50">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 text-cyan-300">Education</h3>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-700 p-4 rounded-lg shadow-inner shadow-black/20">
                      <div>
                        <div className="font-semibold text-gray-200">{edu.degree}</div>
                        <div className="text-gray-400">{edu.institution}</div>
                      </div>
                      <div className="text-cyan-400 mt-2 sm:mt-0">{edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 text-cyan-300">Certifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-gray-700 p-4 rounded-lg shadow-inner shadow-black/20">
                      <FaCertificate className="text-cyan-400 text-xl flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold text-gray-200">{cert.name}</div>
                        <div className="text-gray-400">{cert.issuer}</div>
                        <div className="text-cyan-400 text-sm">{cert.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 text-cyan-300">Contact Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-700 p-4 rounded-lg shadow-inner shadow-black/20">
                  <div>
                    <div className="font-semibold text-gray-200">Email</div>
                    <div className="text-gray-400">{profile.contact.email}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-200">Office</div>
                    <div className="text-gray-400">{profile.contact.office}</div>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-200">Office Hours</div>
                    <div className="text-gray-400">{profile.contact.officeHours}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      {/* Top navbar - similar to the reference image */}
      

      <div className="flex flex-col md:flex-row">
        {/* Sidebar - now scrolls with content */}
        <div className="w-full md:w-64 bg-gray-800 p-4 space-y-4 border-r border-gray-700">
          <div className="text-2xl font-bold text-center p-4 border-b border-gray-700 text-cyan-400 drop-shadow-lg shadow-cyan-500/50">
            Collaborator<br/>Dashboard
          </div>
          <nav className="space-y-3 mt-6">
            <TabButton
              name="requests"
              icon={<FaUserFriends className="w-5 h-5" />}
              label="Collaboration Requests"
            />
            <TabButton
              name="activeCollaborations"
              icon={<FaProjectDiagram className="w-5 h-5" />}
              label="Active Collaborations"
            />
            <TabButton
              name="analytics"
              icon={<FaChartLine className="w-5 h-5" />}
              label="Analytics"
            />
            <TabButton
              name="profile"
              icon={<FaUser className="w-5 h-5" />}
              label="Profile"
            />
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CollaboratorDashboard;
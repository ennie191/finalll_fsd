import React, { useState } from "react";
import { FaUserFriends, FaProjectDiagram, FaBell, FaChartLine, FaCheckCircle, FaTimesCircle, FaUser, FaEdit, FaCertificate, FaLinkedin, FaGithub } from "react-icons/fa";

const CollaboratorDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  // Mock data for collaboration requests
  const [collaborationRequests, setCollaborationRequests] = useState([
    {
      id: 1,
      studentName: "John Doe",
      projectTitle: "AI Healthcare Solution",
      department: "Artificial Intelligence & Data Science",
      sdgs: [3, 9],
      description: "Need expertise in healthcare data analysis and machine learning",
      skills: ["Python", "Machine Learning", "Healthcare Analytics"],
      status: "pending",
      dateRequested: "2024-03-15"
    },
    {
      id: 2,
      studentName: "Jane Smith",
      projectTitle: "Smart Agriculture System",
      department: "Electronics & Computer Science",
      sdgs: [2, 13],
      description: "Looking for IoT and data analysis expertise",
      skills: ["IoT", "Data Analysis", "Sensor Networks"],
      status: "pending",
      dateRequested: "2024-03-16"
    }
  ]);

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

  const handleRequestAction = (requestId, action) => {
    setCollaborationRequests(prev =>
      prev.map(request =>
        request.id === requestId
          ? { ...request, status: action }
          : request
      )
    );
  };

  const TabButton = ({ name, icon, label }) => (
    <button
      onClick={() => setActiveTab(name)}
      className={`flex items-center space-x-2 p-4 w-full ${
        activeTab === name
          ? "bg-blue-500 text-white"
          : "hover:bg-blue-50 text-gray-700"
      } transition-all rounded-lg`}
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
            <h2 className="text-2xl font-bold">Collaboration Requests</h2>
            <div className="grid gap-6">
              {collaborationRequests.map((request) => (
                <div key={request.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold">{request.projectTitle}</h3>
                      <p className="text-gray-600 mt-1">Student: {request.studentName}</p>
                      <p className="text-gray-600">Department: {request.department}</p>
                      
                      <div className="flex gap-2 mt-3">
                        {request.sdgs.map((sdg) => (
                          <span key={sdg} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            SDG {sdg}
                          </span>
                        ))}
                      </div>

                      <p className="mt-4 text-gray-700">{request.description}</p>

                      <div className="mt-3">
                        <p className="text-sm font-semibold">Required Skills:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {request.skills.map((skill, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-gray-500">
                        Requested on: {request.dateRequested}
                      </span>
                      {request.status === 'pending' && (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => handleRequestAction(request.id, 'accepted')}
                            className="flex items-center gap-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          >
                            <FaCheckCircle className="w-4 h-4" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleRequestAction(request.id, 'rejected')}
                            className="flex items-center gap-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            <FaTimesCircle className="w-4 h-4" />
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "activeCollaborations":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Active Collaborations</h2>
            <div className="grid gap-6">
              {activeCollaborations.map((project) => (
                <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{project.projectTitle}</h3>
                      <p className="text-gray-600">Team Lead: {project.teamLead}</p>
                      <p className="text-gray-600">Department: {project.department}</p>
                      
                      <div className="flex gap-2 mt-3">
                        {project.sdgs.map((sdg) => (
                          <span key={sdg} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                            SDG {sdg}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Started: {project.startDate}</p>
                      <p className="text-sm text-gray-500 mt-1">Next Meeting: {project.nextMeeting}</p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Project Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 rounded-full h-2"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Milestones</h4>
                    <div className="space-y-2">
                      {project.milestones.map((milestone) => (
                        <div key={milestone.id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={milestone.completed}
                              readOnly
                              className="rounded text-blue-500"
                            />
                            <span className={milestone.completed ? "line-through text-gray-500" : ""}>
                              {milestone.title}
                            </span>
                          </div>
                          <span className={`text-sm ${
                            milestone.completed ? "text-green-600" : "text-gray-500"
                          }`}>
                            {milestone.completed ? "Completed" : "In Progress"}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="mt-6">
                    <h4 className="font-semibold mb-3">Team Members</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.teamMembers.map((member, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                          {member}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                      Update Progress
                    </button>
                    <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                      Schedule Meeting
                    </button>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                      View Documents
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Collaboration Analytics</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Project Distribution</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  [Project Distribution Chart]
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">SDG Impact</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  [SDG Impact Chart]
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Progress Overview</h3>
                <div className="h-64 bg-gray-100 rounded flex items-center justify-center">
                  [Progress Overview Chart]
                </div>
              </div>
            </div>
          </div>
        );

      case "profile":
        return (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              {/* Header Section */}
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-6">
                  <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-500">
                      {profile.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold">{profile.name}</h2>
                    <p className="text-xl text-gray-600">{profile.title}</p>
                    <p className="text-gray-500">{profile.department}</p>
                    <div className="flex space-x-4 mt-4">
                      <a href={profile.contact.linkedin} className="text-blue-600 hover:text-blue-800">
                        <FaLinkedin size={24} />
                      </a>
                      <a href={profile.contact.github} className="text-gray-700 hover:text-gray-900">
                        <FaGithub size={24} />
                      </a>
                    </div>
                  </div>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-600">
                  <FaEdit />
                  <span>Edit Profile</span>
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-4 gap-6 mt-8">
                {Object.entries(profile.stats).map(([key, value]) => (
                  <div key={key} className="bg-gray-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{value}</div>
                    <div className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  </div>
                ))}
              </div>

              {/* Bio Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">About</h3>
                <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
              </div>

              {/* Expertise Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {profile.expertise.map((skill, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Education</h3>
                <div className="space-y-4">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                      <div>
                        <div className="font-semibold">{edu.degree}</div>
                        <div className="text-gray-600">{edu.institution}</div>
                      </div>
                      <div className="text-gray-500">{edu.year}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Section */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Certifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start space-x-3 bg-gray-50 p-4 rounded-lg">
                      <FaCertificate className="text-blue-500 text-xl flex-shrink-0 mt-1" />
                      <div>
                        <div className="font-semibold">{cert.name}</div>
                        <div className="text-gray-600">{cert.issuer}</div>
                        <div className="text-gray-500 text-sm">{cert.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-gray-600">{profile.contact.email}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Office</div>
                    <div className="text-gray-600">{profile.contact.office}</div>
                  </div>
                  <div>
                    <div className="font-semibold">Office Hours</div>
                    <div className="text-gray-600">{profile.contact.officeHours}</div>
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
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white h-screen shadow-lg p-4 space-y-4 fixed">
          <div className="text-2xl font-bold text-center p-4 border-b">
            Collaborator Dashboard
          </div>
          <nav className="space-y-2">
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
        <div className="flex-1 ml-64 p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default CollaboratorDashboard;

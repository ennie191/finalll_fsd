import React, { useState, useEffect } from 'react';
import { FaUsers, FaProjectDiagram, FaChartBar, FaCog, FaUserGraduate, FaUserTie, FaGlobe, FaSearch, FaBell, FaEllipsisV } from 'react-icons/fa';

// Custom CSS for neuromorphic effects
const neuromorphicStyles = `
  .neuro-bg {
    background-color: #0a1929;
    color: #e6f7ff;
  }
  
  .neuro-card {
    background: linear-gradient(145deg, #081627, #0c1c31);
    border-radius: 16px;
    box-shadow: 8px 8px 16px #05101d, -8px -8px 16px #0f2235;
    transition: all 0.3s ease;
  }
  
  .neuro-card:hover {
    box-shadow: 10px 10px 20px #05101d, -10px -10px 20px #0f2235;
    transform: translateY(-5px);
  }
  
  .neuro-inset {
    background: linear-gradient(145deg, #081627, #0c1c31);
    border-radius: 12px;
    box-shadow: inset 4px 4px 8px #05101d, inset -4px -4px 8px #0f2235;
  }
  
  .neuro-button {
    background: linear-gradient(145deg, #081627, #0c1c31);
    border-radius: 12px;
    box-shadow: 4px 4px 8px #05101d, -4px -4px 8px #0f2235;
    transition: all 0.2s ease;
    color: #80deea;
    border: none;
  }
  
  .neuro-button:hover {
    box-shadow: 6px 6px 10px #05101d, -6px -6px 10px #0f2235;
    background: linear-gradient(145deg, #0c1c31, #081627);
  }
  
  .neuro-button:active {
    box-shadow: inset 4px 4px 8px #05101d, inset -4px -4px 8px #0f2235;
  }
  
  .cyan-glow {
    color: #4dd0e1;
    text-shadow: 0 0 10px rgba(77, 208, 225, 0.5);
  }
  
  .blue-glow {
    color: #29b6f6;
    text-shadow: 0 0 10px rgba(41, 182, 246, 0.5);
  }
  
  .teal-glow {
    color: #26a69a;
    text-shadow: 0 0 10px rgba(38, 166, 154, 0.5);
  }
  
  .cyan-border-glow {
    border: 1px solid #4dd0e1;
    box-shadow: 0 0 8px rgba(77, 208, 225, 0.6);
  }
  
  .tab-active {
    background: linear-gradient(145deg, #0c1c31, #081627);
    box-shadow: inset 3px 3px 6px #05101d, inset -3px -3px 6px #0f2235;
    color: #4dd0e1;
    border-bottom: 2px solid #4dd0e1;
  }
  
  .table-header {
    background: linear-gradient(145deg, #081627, #0c1c31);
  }
  
  .table-row:hover {
    background: rgba(77, 208, 225, 0.05);
  }
  
  .status-badge {
    border-radius: 12px;
    padding: 4px 8px;
    font-size: 0.75rem;
    font-weight: 600;
  }
  
  .status-active {
    background: rgba(38, 166, 154, 0.2);
    color: #26a69a;
    border: 1px solid rgba(38, 166, 154, 0.4);
  }
  
  .status-approved {
    background: rgba(38, 166, 154, 0.2);
    color: #26a69a;
    border: 1px solid rgba(38, 166, 154, 0.4);
  }
  
  .status-rejected {
    background: rgba(229, 115, 115, 0.2);
    color: #ef5350;
    border: 1px solid rgba(229, 115, 115, 0.4);
  }
  
  .status-pending {
    background: rgba(41, 182, 246, 0.2);
    color: #29b6f6;
    border: 1px solid rgba(41, 182, 246, 0.4);
  }
  
  .sdg-tag {
    background: rgba(77, 208, 225, 0.2);
    color: #4dd0e1;
    border: 1px solid rgba(77, 208, 225, 0.4);
    border-radius: 12px;
    padding: 2px 8px;
    font-size: 0.75rem;
  }

  .approve-btn {
    background: linear-gradient(145deg, #089981, #067761);
    color: #e0f7fa;
    box-shadow: 3px 3px 6px #05101d, -3px -3px 6px #0f2235;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .approve-btn:hover {
    background: linear-gradient(145deg, #067761, #089981);
    box-shadow: 4px 4px 8px #05101d, -4px -4px 8px #0f2235;
  }
  
  .reject-btn {
    background: linear-gradient(145deg, #d32f2f, #b71c1c);
    color: #ffebee;
    box-shadow: 3px 3px 6px #05101d, -3px -3px 6px #0f2235;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .reject-btn:hover {
    background: linear-gradient(145deg, #b71c1c, #d32f2f);
    box-shadow: 4px 4px 8px #05101d, -4px -4px 8px #0f2235;
  }
  
  .add-btn {
    background: linear-gradient(145deg, #0288d1, #01579b);
    color: #e1f5fe;
    box-shadow: 3px 3px 6px #05101d, -3px -3px 6px #0f2235;
    border-radius: 8px;
    transition: all 0.2s ease;
  }
  
  .add-btn:hover {
    background: linear-gradient(145deg, #01579b, #0288d1);
    box-shadow: 4px 4px 8px #05101d, -4px -4px 8px #0f2235;
  }
  
  .search-input {
    background: linear-gradient(145deg, #081627, #0c1c31);
    border: none;
    box-shadow: inset 4px 4px 8px #05101d, inset -4px -4px 8px #0f2235;
    color: #e6f7ff;
    border-radius: 8px;
    padding: 10px 16px 10px 40px;
  }
  
  .search-input::placeholder {
    color: #64b5f6;
    opacity: 0.6;
  }
  
  .activity-dot-green {
    background: #26a69a;
    box-shadow: 0 0 6px rgba(38, 166, 154, 0.6);
  }
  
  .activity-dot-blue {
    background: #29b6f6;
    box-shadow: 0 0 6px rgba(41, 182, 246, 0.6);
  }
`;

const AdminDashboard = () => {
  const [sdgStats, setSdgStats] = useState([
    { id: 1, sdg: 1, projects: 5, impact: "High" },
    { id: 2, sdg: 2, projects: 3, impact: "Medium" },
    { id: 3, sdg: 3, projects: 4, impact: "High" },
    { id: 4, sdg: 4, projects: 2, impact: "Low" },
  ]);
  const [message, setMessage] = useState(null);
  const [users, setUsers] = useState({
    students: [
      { id: 1, name: "John Doe", department: "Computer Science", projects: 2, status: "active" },
      { id: 2, name: "Jane Smith", department: "Environmental Science", projects: 1, status: "active" }
    ],
    mentors: [
      { id: 1, name: "Dr. Sarah Wilson", department: "Computer Science", mentees: 5, status: "active" },
      { id: 2, name: "Prof. Michael Brown", department: "Environmental Science", mentees: 3, status: "active" }
    ],
    collaborators: [
      { id: 1, name: "Tech Solutions Inc.", type: "Industry", projects: 3, status: "active" },
      { id: 2, name: "Green Earth NGO", type: "NGO", projects: 2, status: "active" }
    ]
  });

  const [projects, setProjects] = useState([
    { 
      _id: 1, 
      title: "AI Healthcare Solution", 
      department: "Computer Science", 
      status: "Pending", 
      sdgs: [3, 9], 
      description: "An AI-powered solution to improve healthcare accessibility in rural areas." 
    },
    { 
      _id: 2, 
      title: "Sustainable Agriculture", 
      department: "Environmental Science", 
      status: "Pending", 
      sdgs: [2, 12, 15], 
      description: "Exploring sustainable farming practices to improve crop yield while reducing environmental impact." 
    },
  ]);

  useEffect(() => {
    const fetchPendingProjects = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/projects/pending"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch pending projects");
        }
        const data = await response.json();
        if (data && data.length > 0) {
          setProjects(data); // Update the state with fetched projects
        }
      } catch (error) {
        console.error("Error fetching pending projects:", error);
      }
    };

    fetchPendingProjects();
  }, []);

  const handleAction = async (id, action) => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/projects/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: action }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update project status");
      }
  
      const data = await response.json();
      setProjects((prev) =>
        prev.map((project) =>
          project._id === id ? { ...project, status: action } : project
        )
      );
      setMessage({ type: "success", text: `Project ${action.toLowerCase()} successfully!` });
      
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (error) {
      console.error("Error updating project status:", error);
      setMessage({ type: "error", text: "Failed to update project status" });
      
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="neuro-bg min-h-screen">
      <style>{neuromorphicStyles}</style>
      
      {message && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'} shadow-lg z-50`}>
          {message.text}
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold cyan-glow">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 neuro-button">
              <FaBell className="w-6 h-6" />
            </button>
            <button className="p-2 neuro-button">
              <FaCog className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="neuro-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold cyan-glow">{users.students.length}</div>
                <div className="text-cyan-200 opacity-80">Total Students</div>
              </div>
              <FaUserGraduate className="w-8 h-8 blue-glow" />
            </div>
          </div>
          <div className="neuro-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold cyan-glow">{users.mentors.length}</div>
                <div className="text-cyan-200 opacity-80">Total Mentors</div>
              </div>
              <FaUserTie className="w-8 h-8 teal-glow" />
            </div>
          </div>
          <div className="neuro-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold cyan-glow">{projects.length}</div>
                <div className="text-cyan-200 opacity-80">Active Projects</div>
              </div>
              <FaProjectDiagram className="w-8 h-8 blue-glow" />
            </div>
          </div>
          <div className="neuro-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold cyan-glow">{sdgStats.length}</div>
                <div className="text-cyan-200 opacity-80">SDGs Addressed</div>
              </div>
              <FaGlobe className="w-8 h-8 teal-glow" />
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="neuro-card mb-8">
          <div className="flex border-b border-cyan-900">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'overview'
                  ? 'tab-active'
                  : 'text-cyan-300 hover:text-cyan-100'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'users'
                  ? 'tab-active'
                  : 'text-cyan-300 hover:text-cyan-100'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'projects'
                  ? 'tab-active'
                  : 'text-cyan-300 hover:text-cyan-100'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('sdgs')}
              className={`px-6 py-4 text-sm font-medium transition-all duration-300 ${
                activeTab === 'sdgs'
                  ? 'tab-active'
                  : 'text-cyan-300 hover:text-cyan-100'
              }`}
            >
              SDGs
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Recent Activity */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 cyan-glow">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="neuro-inset p-4 flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full activity-dot-green"></div>
                      <div>
                        <p className="text-sm font-medium text-cyan-100">New project created: AI Healthcare Solution</p>
                        <p className="text-xs text-cyan-300 opacity-70">2 hours ago</p>
                      </div>
                    </div>
                    <div className="neuro-inset p-4 flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full activity-dot-blue"></div>
                      <div>
                        <p className="text-sm font-medium text-cyan-100">New mentor joined: Prof. Michael Brown</p>
                        <p className="text-xs text-cyan-300 opacity-70">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Health */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 cyan-glow">System Health</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="neuro-inset p-4">
                      <p className="text-sm font-medium text-cyan-300">Server Status</p>
                      <p className="text-green-400 font-semibold mt-1">Operational</p>
                    </div>
                    <div className="neuro-inset p-4">
                      <p className="text-sm font-medium text-cyan-300">Last Backup</p>
                      <p className="text-cyan-100 mt-1">2 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex gap-4 mb-6">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="w-full search-input"
                    />
                    <FaSearch className="absolute left-4 top-4 text-cyan-400 opacity-70" />
                  </div>
                  <button className="px-4 py-2 add-btn font-medium">
                    Add User
                  </button>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto rounded-lg neuro-inset">
                  <table className="min-w-full">
                    <thead className="table-header">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-cyan-900">
                      {[...users.students, ...users.mentors].map((user) => (
                        <tr key={user.id} className="table-row">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-cyan-100">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-cyan-200 opacity-80">{user.department}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-cyan-200 opacity-80">
                              {user.mentees ? 'Mentor' : 'Student'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="status-badge status-active">
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="neuro-button p-2">
                              <FaEllipsisV className="text-cyan-400" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'projects' && (
              <div className="space-y-6">
                {/* Projects List */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects && projects.length > 0 ? (
                    projects.map((project) => (
                      <div key={project._id} className="neuro-card p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-semibold cyan-glow">{project.title}</h3>
                            <p className="text-cyan-200 opacity-70">{project.department}</p>
                          </div>
                          <span
                            className={`status-badge ${
                              project.status === 'Approved'
                                ? 'status-approved'
                                : project.status === 'Rejected'
                                ? 'status-rejected'
                                : 'status-pending'
                            }`}
                          >
                            {project.status}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.sdgs &&
                            project.sdgs.map((sdg) => (
                              <span
                                key={sdg}
                                className="sdg-tag"
                              >
                                SDG {sdg}
                              </span>
                            ))}
                        </div>

                        <div className="mb-6">
                          <p className="text-sm text-cyan-100">{project.description}</p>
                        </div>

                        {/* Approval Buttons */}
                        <div className="flex gap-4">
                          <button
                            onClick={() => handleAction(project._id, 'Approved')}
                            className="approve-btn font-medium py-2 px-4 flex-1"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleAction(project._id, 'Rejected')}
                            className="reject-btn font-medium py-2 px-4 flex-1"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="neuro-inset p-6 col-span-2 text-center">
                      <p className="text-cyan-200">No pending projects to display.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'sdgs' && (
              <div className="space-y-6">
                {/* SDG Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sdgStats.map((stat) => (
                    <div key={stat.id} className="neuro-card p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold cyan-glow">SDG {stat.sdg}</h3>
                        <span className={`status-badge ${
                          stat.impact === 'High' ? 'status-approved' : 'status-pending'
                        }`}>
                          {stat.impact} Impact
                        </span>
                      </div>
                      <div className="text-3xl font-bold blue-glow mb-2">{stat.projects}</div>
                      <div className="text-cyan-200 opacity-70">Active Projects</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
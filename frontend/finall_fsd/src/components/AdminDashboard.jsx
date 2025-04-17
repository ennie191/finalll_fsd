import React, { useState,useEffect} from 'react';
import { FaUsers, FaProjectDiagram, FaChartBar, FaCog, FaUserGraduate, FaUserTie, FaGlobe, FaSearch, FaBell, FaEllipsisV } from 'react-icons/fa';

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

  const [projects, setProjects] = useState([]);

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
        setProjects(data); // Update the state with fetched projects
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
          project.id === id ? { ...project, status: action } : project
        )
      );
      alert(`Project ${action.toLowerCase()} successfully!`);
    } catch (error) {
      console.error("Error updating project status:", error);
    }
  };

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <FaBell className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-800">
              <FaCog className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800">{users.students.length}</div>
                <div className="text-gray-600">Total Students</div>
              </div>
              <FaUserGraduate className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800">{users.mentors.length}</div>
                <div className="text-gray-600">Total Mentors</div>
              </div>
              <FaUserTie className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800">{projects.length}</div>
                <div className="text-gray-600">Active Projects</div>
              </div>
              <FaProjectDiagram className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xl font-bold text-gray-800">{sdgStats.length}</div>
                <div className="text-gray-600">SDGs Addressed</div>
              </div>
              <FaGlobe className="w-8 h-8 text-teal-500" />
            </div>
          </div>
        </div>

        {/* Main Content Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="flex border-b">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'users'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'projects'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('sdgs')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'sdgs'
                  ? 'border-b-2 border-blue-500 text-blue-500'
                  : 'text-gray-600 hover:text-gray-800'
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
                  <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">New project created: AI Healthcare Solution</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">New mentor joined: Prof. Michael Brown</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* System Health */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">System Health</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium">Server Status</p>
                      <p className="text-green-500">Operational</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium">Last Backup</p>
                      <p className="text-gray-600">2 hours ago</p>
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
                      className="w-full pl-10 pr-4 py-2 border rounded-lg"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Add User
                  </button>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {[...users.students, ...users.mentors].map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.department}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {user.mentees ? 'Mentor' : 'Student'}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {user.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button className="text-gray-400 hover:text-gray-600">
                              <FaEllipsisV />
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
          <div key={project._id} className="bg-gray-50 rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{project.title}</h3>
                <p className="text-gray-600">{project.department}</p>
              </div>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  project.status === 'Approved'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'Rejected'
                    ? 'bg-red-100 text-red-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {project.status}
              </span>
            </div>

            <div className="flex gap-2 mb-4">
              {project.sdgs &&
                project.sdgs.map((sdg) => (
                  <span
                    key={sdg}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                  >
                    SDG {sdg}
                  </span>
                ))}
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-600">{project.description}</p>
            </div>

            {/* Approval Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => handleAction(project._id, 'Approved')}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(project._id, 'Rejected')}
                className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600">No pending projects to display.</p>
      )}
    </div>
  </div>
)}

            {activeTab === 'sdgs' && (
              <div className="space-y-6">
                {/* SDG Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {sdgStats.map((stat) => (
                    <div key={stat.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">SDG {stat.sdg}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          stat.impact === 'High' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {stat.impact} Impact
                        </span>
                      </div>
                      <div className="text-3xl font-bold mb-2">{stat.projects}</div>
                      <div className="text-gray-600">Active Projects</div>
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
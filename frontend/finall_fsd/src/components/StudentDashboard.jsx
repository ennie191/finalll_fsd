import React, { useState } from 'react';
import { FaProjectDiagram, FaUserFriends, FaChartLine, FaBook, FaPlus, FaTasks, FaFileUpload, FaComments } from 'react-icons/fa';

const StudentDashboard = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Smart Agriculture IoT System",
      sdgs: [2, 13],
      progress: 65,
      tasks: [
        { id: 1, text: "Setup IoT sensors", completed: true },
        { id: 2, text: "Implement data collection", completed: true },
        { id: 3, text: "Create dashboard", completed: false },
        { id: 4, text: "Test system", completed: false }
      ],
      teamMembers: ["John Doe", "Jane Smith", "Alex Johnson"],
      mentor: "Dr. Sarah Wilson",
      deadline: "2024-05-15"
    },
    // Add more projects as needed
  ]);

  const [mentorRequests, setMentorRequests] = useState([
    {
      id: 1,
      mentorName: "Dr. James Brown",
      expertise: ["AI", "Machine Learning"],
      status: "pending",
      projectTitle: "AI for Healthcare",
      message: "Would like guidance on implementing ML algorithms for healthcare data analysis"
    }
  ]);

  const [collaborationRequests, setCollaborationRequests] = useState([
    {
      id: 1,
      studentName: "Emma Thompson",
      skills: ["Frontend Development", "UI/UX"],
      projectId: 1,
      status: "pending",
      message: "Interested in contributing to the frontend development"
    }
  ]);

  const calculateProgress = (tasks) => {
    if (!tasks.length) return 0;
    const completed = tasks.filter(task => task.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  const handleTaskToggle = (projectId, taskId) => {
    setProjects(projects.map(project => {
      if (project.id === projectId) {
        const updatedTasks = project.tasks.map(task => 
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        return { ...project, tasks: updatedTasks };
      }
      return project;
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Student Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
            <FaPlus /> New Project
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-bold text-gray-800">{projects.length}</div>
            <div className="text-gray-600">Active Projects</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-bold text-gray-800">{mentorRequests.length}</div>
            <div className="text-gray-600">Pending Mentor Requests</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-bold text-gray-800">{collaborationRequests.length}</div>
            <div className="text-gray-600">Collaboration Requests</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-bold text-gray-800">
              {Math.round(projects.reduce((acc, proj) => acc + calculateProgress(proj.tasks), 0) / projects.length)}%
            </div>
            <div className="text-gray-600">Average Progress</div>
          </div>
        </div>

        {/* Active Projects */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map(project => (
              <div key={project.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{project.title}</h3>
                    <div className="flex gap-2 mt-2">
                      {project.sdgs.map(sdg => (
                        <span key={sdg} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          SDG {sdg}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-gray-600">Deadline</div>
                    <div className="font-semibold">{project.deadline}</div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{calculateProgress(project.tasks)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${calculateProgress(project.tasks)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Tasks</h4>
                  <div className="space-y-2">
                    {project.tasks.map(task => (
                      <div key={task.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleTaskToggle(project.id, task.id)}
                          className="rounded text-blue-500"
                        />
                        <span className={task.completed ? "line-through text-gray-500" : ""}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Team Members */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Team</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.teamMembers.map((member, index) => (
                      <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4">
                  <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                    <FaTasks /> Update Tasks
                  </button>
                  <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
                    <FaFileUpload /> Upload Files
                  </button>
                  <button className="flex items-center gap-1 bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600">
                    <FaComments /> Feedback
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentor Requests */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mentor Requests</h2>
          <div className="bg-white rounded-lg shadow-md">
            {mentorRequests.map(request => (
              <div key={request.id} className="p-6 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{request.mentorName}</h3>
                    <p className="text-gray-600">{request.projectTitle}</p>
                    <p className="text-sm text-gray-500 mt-2">{request.message}</p>
                    <div className="flex gap-2 mt-3">
                      {request.expertise.map((skill, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration Requests */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Collaboration Requests</h2>
          <div className="bg-white rounded-lg shadow-md">
            {collaborationRequests.map(request => (
              <div key={request.id} className="p-6 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{request.studentName}</h3>
                    <p className="text-gray-600">Project: {projects.find(p => p.id === request.projectId)?.title}</p>
                    <p className="text-sm text-gray-500 mt-2">{request.message}</p>
                    <div className="flex gap-2 mt-3">
                      {request.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-800">
                    {request.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
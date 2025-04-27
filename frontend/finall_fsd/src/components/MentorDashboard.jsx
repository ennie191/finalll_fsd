import React, { useState,useEffect } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardCheck, FaClock, FaCalendarAlt, FaComments, FaFileAlt } from 'react-icons/fa';

const MentorDashboard = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');
  const [availableProjects, setAvailableProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mentorId = "6800e357fb69aeea30cb3ae2"; // Hardcoded mentor ID
  const [myRequests, setMyRequests] = useState([]);
const [requestsLoading, setRequestsLoading] = useState(false);
const [studentProjectRequests, setStudentProjectRequests] = useState([]);

// Update the useEffect to fetch student requests
useEffect(() => {
  const fetchStudentRequests = async () => {
    setRequestsLoading(true);
    try {
      // Use the student-requests endpoint to get requests from students
      const response = await fetch('http://localhost:5000/api/mentorship/student-requests');
      const data = await response.json();
      console.log('All Student Requests:', data);
      // console.log('Requests for this mentor:', mentorRequests);

      setStudentProjectRequests(data);
    } catch (error) {
      console.error('Error fetching student requests:', error);
      setError('Failed to fetch student requests');
    } finally {
      setRequestsLoading(false);
    }
  };

  fetchStudentRequests();
}, []);

// Add handler for student requests
const handleStudentRequest = async (projectId, studentId, status) => {
  try {
    const response = await fetch(`http://localhost:5000/api/mentorship/student-update/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        studentId,
        mentorId: MENTOR_ID,
        status 
      })
    });

    if (!response.ok) throw new Error('Failed to update request');

    // Update local state
    setStudentProjectRequests(prev =>
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
// Add this state
const [mentorshipRequests, setMentorshipRequests] = useState([]);
const MENTOR_ID = "6800e357fb69aeea30cb3ae2";

// Add state for both types of requests
const [studentRequests, setStudentRequests] = useState([]);
const [projectRequests, setProjectRequests] = useState([]);
useEffect(() => {
  const fetchStudentRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mentorship/student-requests');
      const data = await response.json();
      const forMentor = data.filter(req => req.mentorId === MENTOR_ID);
      setStudentRequests(forMentor);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchStudentRequests();
}, []);


// Add useEffect to fetch project requests
useEffect(() => {
  const fetchProjectRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mentorship/requests');
      const data = await response.json();
      const mentorRequests = data.filter(req => req.mentorId === MENTOR_ID);
      setProjectRequests(mentorRequests);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  fetchProjectRequests();
}, []);

// Add handler for project requests
const handleProjectRequest = async (projectId, status) => {
  try {
    const response = await fetch(`http://localhost:5000/api/mentorship/update/${projectId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mentorId: MENTOR_ID,
        status
      })
    });

    if (!response.ok) throw new Error('Failed to update request');

    setProjectRequests(prev =>
      prev.map(req =>
        req.projectId === projectId ? { ...req, status } : req
      )
    );
  } catch (error) {
    console.error('Error:', error);
  }
};

// Add after existing useEffect
useEffect(() => {
  const fetchMentorRequests = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/mentorship/requests');
      const data = await response.json();
      // Filter requests for this mentor
      const mentorRequests = data.filter(
        request => request.mentorId === MENTOR_ID
      );
      setMentorshipRequests(mentorRequests);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  fetchMentorRequests();
}, []);

// Update handleMentorshipAction
const handleMentorshipAction = async (projectId, status) => {
  try {
    const response = await fetch(`http://localhost:5000/api/mentorship/update/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mentorId: MENTOR_ID,
        status
      }),
    });

    if (!response.ok) throw new Error('Failed to update request');

    setMentorshipRequests(prev =>
      prev.map(req =>
        req.projectId === projectId ? { ...req, status } : req
      )
    );
  } catch (error) {
    console.error('Error:', error);
  }
};

// Add function to handle request response
const handleMentorshipResponse = async (requestId, status) => {
  try {
    const response = await fetch(`http://localhost:5000/api/mentorship/update/${requestId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update request');
    }

    // Update local state
    setMentorshipRequests(prev =>
      prev.map(req =>
        req._id === requestId ? { ...req, status } : req
      )
    );

    alert(`Request ${status.toLowerCase()} successfully`);
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to update request');
  }
};

// Add this useEffect after other useEffect
useEffect(() => {
  const fetchMyRequests = async () => {
    setRequestsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/mentorship/requests');
      const data = await response.json();
      // Filter requests for this mentor
      const mentorRequests = data.filter(
        request => request.mentorId === mentorId
      );
      setMyRequests(mentorRequests);
    } catch (err) {
      setError('Failed to fetch mentorship requests');
      console.error(err);
    } finally {
      setRequestsLoading(false);
    }
  };

  fetchMyRequests();
}, [mentorId]);
  // Fetch available projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const data = await response.json();
        // Filter out pending projects
        const filtered = data.filter(project => project.status !== 'Pending');
        setAvailableProjects(filtered);
      } catch (err) {
        setError('Failed to fetch projects');
        console.error(err);
      }
    };
    fetchProjects();
  }, []);
  const handleMentorshipRequest = async () => {
    if (!selectedProject) {
      alert('Please select a project');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/mentorship/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          projectId: selectedProject,
          mentorId: mentorId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send request');
      }

      alert('Mentorship request sent successfully!');
      setShowForm(false);
      setSelectedProject('');
    } catch (err) {
      setError('Failed to send mentorship request');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const [mentorships, setMentorships] = useState([
    {
      id: 1,
      studentName: "John Doe",
      projectTitle: "AI Healthcare System",
      progress: 75,
      lastMeeting: "2024-03-10",
      nextMeeting: "2024-03-17",
      status: "active",
      tasks: [
        { id: 1, text: "Review ML algorithm", completed: true },
        { id: 2, text: "Provide feedback on documentation", completed: false }
      ]
    }
  ]);

  const [requests, setRequests] = useState([]);

  const [officeHours, setOfficeHours] = useState([
    {
      id: 1,
      day: "Monday",
      time: "14:00-16:00",
      students: [
        { id: 1, name: "Emma Wilson", topic: "Project Architecture Review" }
      ]
    },
    {
      id: 2,
      day: "Wednesday",
      time: "10:00-12:00",
      students: []
    }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-cyan-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-300 drop-shadow-[0_0_8px_rgba(103,232,249,0.6)]">
            Mentor Dashboard
          </h1>
          <button className="bg-cyan-600 text-cyan-50 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-cyan-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),_inset_2px_2px_4px_rgba(255,255,255,0.1)] transition-all hover:shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.2),_inset_1px_1px_2px_rgba(255,255,255,0.1)]">
            <FaCalendarAlt /> Schedule Office Hours
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-blue-950 p-6 rounded-xl shadow-[6px_6px_12px_rgba(10,10,40,0.8),_-6px_-6px_12px_rgba(90,90,130,0.2)] border border-blue-800">
            <div className="text-xl font-bold text-cyan-400">{mentorships.length}</div>
            <div className="text-cyan-200">Active Mentorships</div>
          </div>
          <div className="bg-blue-950 p-6 rounded-xl shadow-[6px_6px_12px_rgba(10,10,40,0.8),_-6px_-6px_12px_rgba(90,90,130,0.2)] border border-blue-800">
            <div className="text-xl font-bold text-cyan-400">{requests.length}</div>
            <div className="text-cyan-200">Pending Requests</div>
          </div>
          <div className="bg-blue-950 p-6 rounded-xl shadow-[6px_6px_12px_rgba(10,10,40,0.8),_-6px_-6px_12px_rgba(90,90,130,0.2)] border border-blue-800">
            <div className="text-xl font-bold text-cyan-400">
              {officeHours.reduce((acc, curr) => acc + curr.students.length, 0)}
            </div>
            <div className="text-cyan-200">Scheduled Meetings</div>
          </div>
          <div className="bg-blue-950 p-6 rounded-xl shadow-[6px_6px_12px_rgba(10,10,40,0.8),_-6px_-6px_12px_rgba(90,90,130,0.2)] border border-blue-800">
            <div className="text-xl font-bold text-cyan-400">
              {mentorships.length ? Math.round(mentorships.reduce((acc, curr) => acc + curr.progress, 0) / mentorships.length) : 0}%
            </div>
            <div className="text-cyan-200">Average Progress</div>
          </div>
        </div>

        {/* Active Mentorships */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-cyan-300 mb-4 drop-shadow-[0_0_6px_rgba(103,232,249,0.5)]">
            Active Mentorships
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentorships.map(mentorship => (
              <div key={mentorship.id} className="bg-blue-900 rounded-xl shadow-[6px_6px_12px_rgba(10,10,40,0.8),_-6px_-6px_12px_rgba(90,90,130,0.2)] p-6 border border-blue-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-cyan-200">{mentorship.studentName}</h3>
                    <p className="text-cyan-300">{mentorship.projectTitle}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-cyan-900 text-cyan-300 shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),_inset_-2px_-2px_4px_rgba(255,255,255,0.1)] border border-cyan-700">
                    {mentorship.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-cyan-300 mb-1">
                    <span>Progress</span>
                    <span>{mentorship.progress}%</span>
                  </div>
                  <div className="w-full bg-blue-950 rounded-full h-2 shadow-[inset_1px_1px_3px_rgba(0,0,0,0.5)]">
                    <div
                      className="bg-gradient-to-r from-cyan-500 to-cyan-300 rounded-full h-2 shadow-[0_0_8px_rgba(103,232,249,0.6)]"
                      style={{ width: `${mentorship.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2 text-cyan-200">Pending Tasks</h4>
                  <div className="space-y-2">
                    {mentorship.tasks.map(task => (
                      <div key={task.id} className="flex items-center gap-2 bg-blue-950 p-2 rounded-lg shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),_inset_-1px_-1px_2px_rgba(255,255,255,0.05)]">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          className="rounded text-cyan-500 bg-blue-800 border-cyan-700"
                          readOnly
                        />
                        <span className={task.completed ? "line-through text-cyan-700" : "text-cyan-100"}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meetings */}
                <div className="mb-4 bg-blue-950 p-3 rounded-lg shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),_inset_-1px_-1px_2px_rgba(255,255,255,0.05)]">
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-cyan-400">Last Meeting:</span>
                      <span className="ml-2 text-cyan-200">{mentorship.lastMeeting}</span>
                    </div>
                    <div>
                      <span className="text-cyan-400">Next Meeting:</span>
                      <span className="ml-2 text-cyan-200">{mentorship.nextMeeting}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 bg-cyan-700 text-cyan-50 px-3 py-2 rounded-lg hover:bg-cyan-600 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),_inset_2px_2px_4px_rgba(255,255,255,0.1)] transition-all hover:shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.2),_inset_1px_1px_2px_rgba(255,255,255,0.1)]">
                    <FaComments /> Provide Feedback
                  </button>
                  <button className="flex items-center gap-1 bg-blue-600 text-cyan-50 px-3 py-2 rounded-lg hover:bg-blue-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),_inset_2px_2px_4px_rgba(255,255,255,0.1)] transition-all hover:shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.2),_inset_1px_1px_2px_rgba(255,255,255,0.1)]">
                    <FaFileAlt /> Review Documents
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship Requests */}
        <div className="mb-8">
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-2xl font-bold text-cyan-300">Interested in Mentorship</h2>
    <button
      onClick={() => setShowForm(!showForm)}
      className="bg-cyan-600 text-cyan-50 px-4 py-2 rounded-lg hover:bg-cyan-500"
    >
      Add a New Mentorship
    </button>
  </div>

  {showForm && (
    <div className="bg-blue-900 p-6 rounded-xl mb-6">
      <h3 className="text-xl font-bold mb-4">Add Mentorship</h3>
      <div className="mb-4">
        <label className="block text-sm mb-2">Select Project</label>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="w-full bg-blue-800 p-2 rounded-lg"
        >
          <option value="">Choose a project...</option>
          {availableProjects.map(project => (
            <option key={project._id} value={project._id}>
              {project.title} - {project.status}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleMentorshipRequest}
        disabled={loading}
        className="bg-cyan-600 text-white px-4 py-2 rounded-lg disabled:opacity-50 hover:bg-cyan-500"
      >
        {loading ? 'Sending...' : 'Send Request'}
      </button>
    </div>
  )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {requestsLoading ? (
      <div className="text-cyan-300">Loading requests...</div>
    ) : myRequests.length === 0 ? (
      <div className="text-cyan-300">No mentorship requests</div>
    ) : (
      myRequests.map((request) => (
        <div key={request._id} className="bg-blue-900 p-6 rounded-xl border border-blue-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-cyan-200">
                {request.projectTitle}
              </h3>
              <p className="text-cyan-300 mt-2">
                Status: 
                <span className={`ml-2 px-2 py-1 rounded-full text-sm ${
                  request.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                  request.status === 'Approved' ? 'bg-green-500/20 text-green-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {request.status}
                </span>
              </p>
            </div>
          </div>
          <p className="text-sm text-cyan-300">
            Requested on: {new Date(request.createdAt).toLocaleDateString()}
          </p>
        </div>
      ))
    )}
  </div>
</div>

<div className="mb-8">
  <h2 className="text-2xl font-bold text-cyan-300 mb-4">Student Project Requests</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {studentProjectRequests.length === 0 ? (
      <div className="text-cyan-300">No project requests from students</div>
    ) : (
      studentProjectRequests.map(request => (
        <div key={request._id} className="bg-blue-900 p-6 rounded-xl border border-blue-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-cyan-200">
                {request.projectTitle}
              </h3>
              <p className="text-cyan-300">Student: {request.studentName}</p>
              <p className="text-sm text-cyan-300 mt-2">Message: {request.message}</p>
            </div>
            <span className={`px-2 py-1 rounded-full text-sm ${
              request.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
              request.status === 'Approved' ? 'bg-green-500/20 text-green-300' :
              'bg-red-500/20 text-red-300'
            }`}>
              {request.status}
            </span>
          </div>

          {request.status === 'Pending' && (
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleStudentRequest(request.projectId, request.studentId, 'Approved')}
                className="bg-green-500/20 hover:bg-green-500/30 text-green-300 px-4 py-2 rounded-lg flex-1 transition-colors"
              >
                Accept
              </button>
              <button
                onClick={() => handleStudentRequest(request.projectId, request.studentId, 'Rejected')}
                className="bg-red-500/20 hover:bg-red-500/30 text-red-300 px-4 py-2 rounded-lg flex-1 transition-colors"
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ))
    )}
  </div>
</div>
  

        {/* Office Hours */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-300 mb-4 drop-shadow-[0_0_6px_rgba(103,232,249,0.5)]">
            Office Hours
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {officeHours.map(slot => (
              <div key={slot.id} className="bg-blue-900 rounded-xl shadow-[6px_6px_12px_rgba(10,10,40,0.8),_-6px_-6px_12px_rgba(90,90,130,0.2)] p-6 border border-blue-700">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-cyan-200">{slot.day}</h3>
                    <p className="text-cyan-300">{slot.time}</p>
                  </div>
                  
                </div>

                <div className="space-y-3">
                  {slot.students.map(student => (
                    <div key={student.id} className="flex justify-between items-center p-3 bg-blue-950 rounded-lg shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),_inset_-1px_-1px_2px_rgba(255,255,255,0.05)]">
                      <div>
                        <div className="font-semibold text-cyan-200">{student.name}</div>
                        <div className="text-sm text-cyan-300">{student.topic}</div>
                      </div>
                      
                    </div>
                  ))}
                  {slot.students.length === 0 && (
                    <p className="text-cyan-500 text-center py-6 bg-blue-950 rounded-lg shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),_inset_-1px_-1px_2px_rgba(255,255,255,0.05)]">
                      No appointments scheduled
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;
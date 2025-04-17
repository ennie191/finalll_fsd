import React, { useState } from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardCheck, FaClock, FaCalendarAlt, FaComments, FaFileAlt } from 'react-icons/fa';

const MentorDashboard = () => {
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
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Mentor Dashboard</h1>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600">
            <FaCalendarAlt /> Schedule Office Hours
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-bold text-gray-800">{mentorships.length}</div>
            <div className="text-gray-600">Active Mentorships</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-bold text-gray-800">{requests.length}</div>
            <div className="text-gray-600">Pending Requests</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-bold text-gray-800">
              {officeHours.reduce((acc, curr) => acc + curr.students.length, 0)}
            </div>
            <div className="text-gray-600">Scheduled Meetings</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-xl font-bold text-gray-800">
              {Math.round(mentorships.reduce((acc, curr) => acc + curr.progress, 0) / mentorships.length)}%
            </div>
            <div className="text-gray-600">Average Progress</div>
          </div>
        </div>

        {/* Active Mentorships */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Active Mentorships</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mentorships.map(mentorship => (
              <div key={mentorship.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{mentorship.studentName}</h3>
                    <p className="text-gray-600">{mentorship.projectTitle}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                    {mentorship.status}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{mentorship.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 rounded-full h-2"
                      style={{ width: `${mentorship.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Tasks */}
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Pending Tasks</h4>
                  <div className="space-y-2">
                    {mentorship.tasks.map(task => (
                      <div key={task.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          className="rounded text-blue-500"
                          readOnly
                        />
                        <span className={task.completed ? "line-through text-gray-500" : ""}>
                          {task.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Meetings */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm">
                    <div>
                      <span className="text-gray-600">Last Meeting:</span>
                      <span className="ml-2">{mentorship.lastMeeting}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Next Meeting:</span>
                      <span className="ml-2">{mentorship.nextMeeting}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button className="flex items-center gap-1 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600">
                    <FaComments /> Provide Feedback
                  </button>
                  <button className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600">
                    <FaFileAlt /> Review Documents
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mentorship Requests */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Mentorship Requests</h2>
          <div className="bg-white rounded-lg shadow-md">
            {requests.map(request => (
              <div key={request.id} className="p-6 border-b last:border-b-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold">{request.studentName}</h3>
                    <p className="text-gray-600">{request.projectTitle}</p>
                    <p className="text-gray-500">{request.department}</p>
                    <p className="text-sm text-gray-600 mt-2">{request.description}</p>
                    <div className="flex gap-2 mt-3">
                      {request.skills.map((skill, index) => (
                        <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                      Accept
                    </button>
                    <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Office Hours */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Office Hours</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {officeHours.map(slot => (
              <div key={slot.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{slot.day}</h3>
                    <p className="text-gray-600">{slot.time}</p>
                  </div>
                  <button className="text-blue-500 hover:text-blue-600">
                    Edit Slot
                  </button>
                </div>

                <div className="space-y-3">
                  {slot.students.map(student => (
                    <div key={student.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <div className="font-semibold">{student.name}</div>
                        <div className="text-sm text-gray-600">{student.topic}</div>
                      </div>
                      <button className="text-blue-500 hover:text-blue-600">
                        View Details
                      </button>
                    </div>
                  ))}
                  {slot.students.length === 0 && (
                    <p className="text-gray-500 text-center py-2">No appointments scheduled</p>
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
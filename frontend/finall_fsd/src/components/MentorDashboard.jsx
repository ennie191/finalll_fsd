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
          <h2 className="text-2xl font-bold text-cyan-300 mb-4 drop-shadow-[0_0_6px_rgba(103,232,249,0.5)]">
            Mentorship Requests
          </h2>
          <div className="bg-blue-950 rounded-xl shadow-[6px_6px_12px_rgba(10,10,40,0.8),_-6px_-6px_12px_rgba(90,90,130,0.2)] border border-blue-800">
            {requests.length === 0 ? (
              <div className="p-6 text-center text-cyan-400">
                No pending mentorship requests
              </div>
            ) : (
              requests.map(request => (
                <div key={request.id} className="p-6 border-b border-blue-800 last:border-b-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-cyan-200">{request.studentName}</h3>
                      <p className="text-cyan-300">{request.projectTitle}</p>
                      <p className="text-cyan-400">{request.department}</p>
                      <p className="text-sm text-cyan-200 mt-2">{request.description}</p>
                      <div className="flex gap-2 mt-3">
                        {request.skills?.map((skill, index) => (
                          <span key={index} className="bg-blue-800 px-3 py-1 rounded-full text-sm text-cyan-200 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.2),_inset_-1px_-1px_2px_rgba(255,255,255,0.1)]">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="bg-green-600 text-cyan-50 px-3 py-1 rounded-lg hover:bg-green-500 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),_inset_2px_2px_4px_rgba(255,255,255,0.1)] transition-all hover:shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.2),_inset_1px_1px_2px_rgba(255,255,255,0.1)]">
                        Accept
                      </button>
                      <button className="bg-red-700 text-cyan-50 px-3 py-1 rounded-lg hover:bg-red-600 shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.3),_inset_2px_2px_4px_rgba(255,255,255,0.1)] transition-all hover:shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.2),_inset_1px_1px_2px_rgba(255,255,255,0.1)]">
                        Decline
                      </button>
                    </div>
                  </div>
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
                  <button className="text-cyan-400 hover:text-cyan-300 bg-blue-800 px-3 py-1 rounded-lg shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.3),_inset_1px_1px_3px_rgba(255,255,255,0.1)] transition-all hover:shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.2),_inset_1px_1px_2px_rgba(255,255,255,0.1)]">
                    Edit Slot
                  </button>
                </div>

                <div className="space-y-3">
                  {slot.students.map(student => (
                    <div key={student.id} className="flex justify-between items-center p-3 bg-blue-950 rounded-lg shadow-[inset_2px_2px_4px_rgba(0,0,0,0.3),_inset_-1px_-1px_2px_rgba(255,255,255,0.05)]">
                      <div>
                        <div className="font-semibold text-cyan-200">{student.name}</div>
                        <div className="text-sm text-cyan-300">{student.topic}</div>
                      </div>
                      <button className="text-cyan-400 hover:text-cyan-300 bg-blue-800 px-3 py-1 rounded-lg shadow-[inset_-1px_-1px_3px_rgba(0,0,0,0.3),_inset_1px_1px_3px_rgba(255,255,255,0.1)] transition-all hover:shadow-[inset_-1px_-1px_2px_rgba(0,0,0,0.2),_inset_1px_1px_2px_rgba(255,255,255,0.1)]">
                        View Details
                      </button>
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
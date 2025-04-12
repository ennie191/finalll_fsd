// src/components/MentorCard.jsx
import React from 'react';

const MentorCard = ({ mentor }) => {
  const domainColors = {
    'Computer Science': 'bg-blue-500/10 text-blue-400',
    'Electronics & Computer Science': 'bg-purple-500/10 text-purple-400',
    'Mechanical': 'bg-amber-500/10 text-amber-400',
    'Artificial Intelligence & Data Science': 'bg-emerald-500/10 text-emerald-400'
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700 overflow-hidden group h-full flex flex-col">
      <div className="p-6 flex-grow">
        {/* Domain Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs px-3 py-1 rounded-full ${domainColors[mentor.domain] || 'bg-gray-700 text-gray-300'}`}>
            {mentor.domain}
          </span>
        </div>

        {/* Mentor Info */}
        <div className="flex items-center gap-4 mb-4">
          <img 
            src={mentor.image} 
            alt={mentor.name} 
            className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 shadow-md"
          />
          <div>
            <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
            <p className="text-sm text-gray-400">{mentor.designation}</p>
          </div>
        </div>

        {/* Expertise */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 mb-2">EXPERTISE</h4>
          <div className="flex flex-wrap gap-2">
            {mentor.expertise.map((skill, i) => (
              <span 
                key={i} 
                className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-gray-500 mb-2">PROJECTS</h4>
          <ul className="space-y-1 text-sm">
            {mentor.projects.map((project, i) => (
              <li key={i} className="flex items-start">
                <span className="text-blue-400 mr-1">•</span>
                <span className="text-gray-300">{project}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Achievements */}
      <div className="border-t border-gray-700 p-4 bg-gray-900/50">
        <h4 className="text-xs font-semibold text-gray-500 mb-1">ACHIEVEMENTS</h4>
        <p className="text-sm text-gray-300">{mentor.achievements.join(", ")}</p>
      </div>
    </div>
  );
};

export default MentorCard;
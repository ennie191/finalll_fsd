import React from 'react';
import { Link } from 'react-router-dom';
import { sdgColors } from '../data/sdgData';

const ProjectCard = ({ project, isAchievement }) => {
  const statusColors = {
    'Prototype Phase': 'bg-blue-500/10 text-blue-400',
    'Testing Phase': 'bg-purple-500/10 text-purple-400',
    'Research Phase': 'bg-amber-500/10 text-amber-400',
    'Completed': 'bg-green-500/10 text-green-400',
    'Active': 'bg-emerald-500/10 text-emerald-400'
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700 overflow-hidden group h-full flex flex-col">
      <div className="p-6 flex-grow">
        {/* Status and Title */}
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs px-3 py-1 rounded-full ${statusColors[project.status] || 'bg-gray-700 text-gray-300'}`}>
            {project.status}
          </span>
          <Link 
            to={`/projects/${project.id}`}
            className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center"
          >
             <span className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </Link>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
        <p className="text-sm text-gray-400 mb-3">{project.department}</p>
        
        {/* Description */}
        <div className="mb-4">
          <p className="text-gray-300 text-sm">
            {project.description}
          </p>
        </div>
        
        {/* SDG Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {project.sdgs?.map(sdg => (
            <span 
              key={sdg} 
              className="text-xs px-3 py-1 rounded-full text-white font-medium shadow-md"
              style={{ 
                backgroundColor: sdgColors[sdg-1] || '#666',
                boxShadow: `0 2px 8px ${sdgColors[sdg-1]}40`
              }}
            >
              SDG {sdg}
            </span>
          ))}
        </div>

        {/* Partners */}
        {project.partners && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">PARTNERS</p>
            <p className="text-sm text-gray-300">{project.partners.join(', ')}</p>
          </div>
        )}

        {/* Achievement */}
        {project.achievement && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1">ACHIEVEMENT</p>
            <p className="text-sm font-medium text-blue-400">{project.achievement}</p>
          </div>
        )}
      </div>
      
      {/* Mentors */}
      <div className="border-t border-gray-700 p-4 bg-gray-900/50">
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-1">MENTORED BY</p>
          <p className="text-sm font-medium text-gray-300">
            {project.mentors?.join(', ') || 'Not specified'}
          </p>
        </div>

      </div>
    </div>
  );
};

export default ProjectCard;
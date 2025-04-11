import React from 'react';
import { Link } from 'react-router-dom'; // Add this import

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="card-header">
        <h3>{project.title}</h3>
        <span className={`status-badge ${project.status.replace(/\s+/g, '-').toLowerCase()}`}>
          {project.status}
        </span>
      </div>
      <p className="department">{project.department}</p>
      <p className="description">{project.description}</p>
      
      <div className="sdg-tags">
        {project.sdgs.map(sdg => (
          <span key={sdg} className="sdg-tag">SDG {sdg}</span>
        ))}
      </div>
      
      <div className="card-footer">
        <div className="mentors">
          <span>Mentors: </span>
          {project.mentors.join(', ')}
        </div>
        <Link to={`/projects/${project.id}`} className="details-link">
          View Details →
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
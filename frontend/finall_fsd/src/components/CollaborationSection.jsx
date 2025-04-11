// src/components/CollaborationSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/collaborationSection.css';

const CollaborationSection = () => {
  const collaborationOptions = [
    {
      role: 'Student',
      title: 'Join Project Teams',
      description: 'Apply your skills on impactful projects, collaborate with mentors, and build your portfolio.',
      icon: '👨‍🎓',
      linkText: 'Find Projects',
      linkPath: '/projects'
    },
    {
      role: 'Faculty',
      title: 'Mentor & Guide',
      description: 'Share your expertise, guide student projects, and connect with industry partners.',
      icon: '👩‍🏫',
      linkText: 'Register as Mentor',
      linkPath: '/faculty/register'
    },
    {
      role: 'Industry Expert',
      title: 'Provide Industry Insights',
      description: 'Mentor promising projects, identify potential solutions for your company, and interact with fresh talent.',
      icon: '👨‍💼',
      linkText: 'Become a Partner',
      linkPath: '/industry/register'
    },
    {
      role: 'NGO',
      title: 'Collaborate on Social Impact',
      description: 'Connect with student teams to build solutions for real-world challenges and community needs.',
      icon: '🌍',
      linkText: 'Partner with Us',
      linkPath: '/ngo/register'
    }
  ];

  return (
    <div className="collaboration-grid">
      {collaborationOptions.map((option, index) => (
        <div key={index} className="collaboration-card">
          <div className="card-icon">{option.icon}</div>
          <div className="role-badge">{option.role}</div>
          <h3>{option.title}</h3>
          <p>{option.description}</p>
          <Link to={option.linkPath} className="collaboration-link">
            {option.linkText} →
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CollaborationSection;
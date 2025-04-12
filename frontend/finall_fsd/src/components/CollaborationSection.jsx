import React from 'react';
import { Link } from 'react-router-dom';

const CollaborationSection = () => {
  const options = [
    {
      role: 'Student',
      title: 'Join Project Teams',
      description: 'Work on impactful projects with mentors and peers.',
      icon: '👨‍🎓',
      color: 'bg-blue-50',
      link: '/projects',
      linkText: 'Browse Projects'
    },
    {
      role: 'Faculty',
      title: 'Mentor Projects',
      description: 'Guide student teams and share your expertise.',
      icon: '👩‍🏫',
      color: 'bg-purple-50', 
      link: '/mentors',
      linkText: 'Join as Mentor'
    },
    {
      role: 'Industry',
      title: 'Partner With Us',
      description: 'Collaborate on innovative solutions.',
      icon: '🏢',
      color: 'bg-green-50',
      link: '/partners',
      linkText: 'Learn More'
    },
    {
      role: 'Organization',
      title: 'Sponsor Projects',
      description: 'Support impactful sustainable development work.',
      icon: '🤝',
      color: 'bg-amber-50',
      link: '/sponsors',
      linkText: 'Get Involved'
    }
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2"></h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {options.map((option, index) => (
            <div 
              key={index} 
              className={`${option.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-gray-100 h-full flex flex-col`}
            >
              <div className="text-3xl mb-4">{option.icon}</div>
              <span className="inline-block bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full mb-3">
                {option.role}
              </span>
              <h3 className="text-lg font-bold mb-3">{option.title}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{option.description}</p>
              <Link 
                to={option.link} 
                className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
              >
                {option.linkText} <span className="ml-1">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollaborationSection;
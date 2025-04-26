import React, { useState, useEffect } from 'react';
import MentorCard from './MentorCard';

const Mentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDomain, setActiveDomain] = useState('All');

  const domains = [
    'Computer Science',
    'Electronics & Computer Science',
    'Mechanical',
    'Artificial Intelligence & Data Science',
  ];

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/mentors');
        const data = await response.json();
        setMentors(data);
      } catch (error) {
        setError('Failed to fetch mentors');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const filteredMentors = activeDomain === 'All' 
    ? mentors 
    : mentors.filter(mentor => mentor.domain === activeDomain);

  const handleImageError = (e) => {
    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(e.target.alt)}&background=random`;
  };

  if (loading) return <div>Loading mentors...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-100 mb-2">Engineering Faculty</h1>
          <p className="text-lg text-gray-300">
            Meet our distinguished professors across engineering disciplines
          </p>
        </div>

        {/* Domain Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setActiveDomain('All')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeDomain === 'All'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All Domains
          </button>
          {domains.map((domain) => (
            <button
              key={domain}
              onClick={() => setActiveDomain(domain)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeDomain === domain
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {domain}
            </button>
          ))}
        </div>

        {/* Mentors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} onImageError={handleImageError} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
// src/pages/Mentors.jsx
import React, { useState } from 'react';
import MentorCard from '../components/MentorCard';
import { mentorsData } from '../data/mentorsData';

const domains = [
  'Computer Science',
  'Electronics & Computer Science', 
  'Mechanical',
  'Artificial Intelligence & Data Science',
];

const Mentors = () => {
  const [activeDomain, setActiveDomain] = useState('All');

  const filteredMentors = activeDomain === 'All' 
    ? mentorsData 
    : mentorsData.filter(mentor => mentor.domain === activeDomain);

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
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
        <div className="text-center mt-8">
  <h3 className="text-xl font-bold text-gray-100 mb-3">Want to join as a mentor?</h3>
  <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
    Share your expertise with our students and guide the next generation of engineers
  </p>
  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow-sm transition-colors">
    Apply Now
  </button>
</div>
      </div>
    </div>
  );
};

export default Mentors;
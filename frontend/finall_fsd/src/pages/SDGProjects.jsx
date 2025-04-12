// src/pages/SDGProjects.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

const SDGProjects = ({ projects }) => {
  const { sdgNumber } = useParams();
  const navigate = useNavigate();
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  // Available departments
  const departments = [
    'Computer Science',
    'Electronics & Computer Science',
    'Artificial Intelligence & Data Science',
,'Mechanical'
  ];

  // Years up to 2020
  const years = [];
  for (let year = 2025; year >= 2020; year--) {
    years.push(year.toString());
  }

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSDG = project.sdgs?.includes(parseInt(sdgNumber));
    const matchesDept = !departmentFilter || project.department === departmentFilter;
    const matchesYear = !yearFilter || project.academicYear === yearFilter;
    return matchesSDG && matchesDept && matchesYear;
  });

  return (
    <div className="min-h-screen flex flex-col">
      
      
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8 w-full">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to SDG Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-2">Projects for SDG {sdgNumber}</h1>
        
        {/* Filters */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Department</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Academic Year</label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">No projects found matching your filters</p>
            <button 
              onClick={() => {
                setDepartmentFilter('');
                setYearFilter('');
              }}
              className="text-blue-600 mt-2"
            >
              Clear all filters
            </button>
          </div>
        )}
      </main>

      
    </div>
  );
};

export default SDGProjects;
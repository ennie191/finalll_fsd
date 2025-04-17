// src/pages/SDGProjects.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

const SDGProjects = () => {
  const { sdgNumber } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        // Build the query string for filters
        const queryParams = new URLSearchParams();
        if (departmentFilter) queryParams.append('department', departmentFilter);
        if (yearFilter) queryParams.append('academicYear', yearFilter);

        const response = await fetch(
          `http://localhost:5000/api/projects/${sdgNumber}?${queryParams.toString()}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log("SDG PROJECTS PAGE" , data); // Debugging line to check the fetched data
        setProjects(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [sdgNumber, departmentFilter, yearFilter]);

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
        <div className="bg-gray-900 p-4 rounded-lg mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Department</label>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" className="text-gray-400">All Departments</option>
                {Array.from(new Set(projects.map((p) => p.department))).map((dept) => (
                  <option key={dept} value={dept} className="text-gray-300">{dept}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Academic Year</label>
              <select
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
                className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" className="text-gray-400">All Years</option>
                {Array.from(new Set(projects.map((p) => p.academicYear))).map((year) => (
                  <option key={year} value={year} className="text-gray-300">{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
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
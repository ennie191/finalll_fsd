import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';

const SDGProjects = () => {
  const { sdgNumber } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState(''); // New filter for project status

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/api/projects/');
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        console.log("SDG PROJECTS PAGE", data);

        setProjects(data); // Store all projects
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Apply filters whenever filter values or projects change
  useEffect(() => {
    if (projects.length === 0) return;

    // Filter projects based on SDG number, department, academic year, and status
    const filtered = projects.filter((project) => {
      // Check if project.sdgs is a string or an array
      const projectSdgs = Array.isArray(project.sdgs)
        ? project.sdgs
        : project.sdgs
        ? [project.sdgs]
        : [];

      // Check if the project matches the SDG filter
      const matchesSDG = sdgNumber
        ? projectSdgs.includes(sdgNumber) || projectSdgs.includes(Number(sdgNumber))
        : true;

      // Check if the project matches the department filter
      const matchesDepartment = departmentFilter
        ? project.department === departmentFilter
        : true;

      // Check if the project matches the academic year filter
      const matchesYear = yearFilter ? project.academicYear === yearFilter : true;

      // Check if the project matches the status filter
      const matchesStatus = statusFilter ? project.status === statusFilter : true;

      return matchesSDG && matchesDepartment && matchesYear && matchesStatus;
    });

    setFilteredProjects(filtered);
  }, [projects, sdgNumber, departmentFilter, yearFilter, statusFilter]);

  // Handle filter changes
  const handleDepartmentChange = (e) => {
    setDepartmentFilter(e.target.value);
  };

  const handleYearChange = (e) => {
    setYearFilter(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const clearFilters = () => {
    setDepartmentFilter('');
    setYearFilter('');
    setStatusFilter('');
  };

  // Extract unique departments, years, and statuses for filter options
  const departments = [
    'Computer Science',
    'Electronics & Computer Science',
    'Artificial Intelligence & Data Science',
    'Mechanical',
  ]; // Example departments
  const academicYears = [2025, 2024, 2023, 2022, 2021, 2020].reverse(); // Example years
  const statuses = [
    'Active',
    'Prototype Phase',
    'Completed',
    'Testing Phase',
    'Research Phase',
  ]; // Example statuses

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
        <p className="text-gray-400 mb-6">Showing active projects only</p>

        {/* Filters */}
        <div className="bg-gray-900 p-4 rounded-lg mb-8 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Department</label>
              <select
                value={departmentFilter}
                onChange={handleDepartmentChange}
                className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" className="text-gray-400">
                  All Departments
                </option>
                {departments.map((dept) => (
                  <option key={dept} value={dept} className="text-gray-300">
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Academic Year</label>
              <select
                value={yearFilter}
                onChange={handleYearChange}
                className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" className="text-gray-400">
                  All Years
                </option>
                {academicYears.map((year) => (
                  <option key={year} value={year} className="text-gray-300">
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Status</label>
              <select
                value={statusFilter}
                onChange={handleStatusChange}
                className="w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="" className="text-gray-400">
                  All Status
                </option>
                {statuses.map((status) => (
                  <option key={status} value={status} className="text-gray-300">
                    {status}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Clear filters button */}
          {(departmentFilter || yearFilter || statusFilter) && (
            <div className="mt-3 text-right">
              <button
                onClick={clearFilters}
                className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-md text-sm"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <ProjectCard key={project._id || project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-300">No active projects found matching your filters</p>
            <button
              onClick={clearFilters}
              className="text-blue-400 hover:text-blue-300 mt-2"
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
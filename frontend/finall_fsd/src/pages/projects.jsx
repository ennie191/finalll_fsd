import React, { useEffect, useState } from "react";

const ProjectsSDG = () => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [loading, setLoading] = useState(false); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [selectedSDG, setSelectedSDG] = useState(""); // State to store the selected SDG

  // Fetch projects by SDG from the backend
  const fetchProjectsBySDG = async (sdg) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:5000/api/projects/sdg/${sdg}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects for the selected SDG");
      }

      const data = await response.json();
      setProjects(data); // Update the projects state
    } catch (err) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Handle SDG selection
  const handleSDGChange = (e) => {
    const sdg = e.target.value;
    setSelectedSDG(sdg);
    if (sdg) {
      fetchProjectsBySDG(sdg); // Fetch projects for the selected SDG
    } else {
      setProjects([]); // Clear projects if no SDG is selected
    }
  };

  return (
    <div>
      <h1>Projects by SDG</h1>

      {/* SDG Selector */}
      <div>
        <label htmlFor="sdg-select">Select an SDG:</label>
        <select id="sdg-select" value={selectedSDG} onChange={handleSDGChange}>
          <option value="">-- Select an SDG --</option>
          <option value="1">SDG 1: No Poverty</option>
          <option value="2">SDG 2: Zero Hunger</option>
          <option value="3">SDG 3: Good Health and Well-being</option>
          <option value="4">SDG 4: Quality Education</option>
          <option value="5">SDG 5: Gender Equality</option>
          {/* Add more SDGs as needed */}
        </select>
      </div>

      {/* Loading State */}
      {loading && <div>Loading projects...</div>}

      {/* Error State */}
      {error && <div>Error: {error}</div>}

      {/* Projects List */}
      <ul>
        {projects.map((project) => (
          <li key={project._id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
            <h2>{project.title}</h2>
            <p><strong>Department:</strong> {project.department}</p>
            <p><strong>Academic Year:</strong> {project.academicYear}</p>
            <p><strong>SDGs:</strong> {project.sdgs.join(", ")}</p>
            <p><strong>Mentors:</strong> {project.mentors.join(", ")}</p>
            <p><strong>Description:</strong> {project.description}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Created At:</strong> {new Date(project.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsSDG;
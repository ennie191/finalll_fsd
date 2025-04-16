import React, { useEffect, useState } from "react";

const ProjectsSDG = () => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Fetch projects from the backend
  const fetchProjects = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch projects");
      }

      const data = await response.json();
      console.log (data); // Log the fetched data
      setProjects(data); // Update the projects state
    } catch (err) {
      setError(err.message); // Set error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Fetch projects on component mount
  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) {
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project._id}>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <p><strong>Owner:</strong> {project.owner?.name || "Unknown"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectsSDG;
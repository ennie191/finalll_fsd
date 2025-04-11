// src/pages/Home.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import SDGDashboard from '../components/SDGDashboard';
import CollaborationSection from '../components/CollaborationSection';
import '../styles/home.css';

// Sample projects data
const sampleProjects = [
  {
    id: 1,
    title: "Solar Water Purifier",
    department: "Mechanical Engineering",
    status: "Prototype Phase",
    sdgs: [6, 7], // Clean Water & Affordable Energy
    mentors: ["Dr. A. Sharma"],
    partners: ["EcoTech Solutions"],
    description: "Low-cost solar-powered water purification system for rural communities",
    lastUpdated: "2025-03-15"
  },
  {
    id: 2,
    title: "AI for Crop Disease Detection",
    department: "Computer Science",
    status: "Testing Phase",
    sdgs: [2, 9], // Zero Hunger & Industry Innovation
    mentors: ["Prof. M. Patel", "Dr. S. Kapoor"],
    partners: ["AgriTech Foundation"],
    description: "Mobile app using computer vision to identify crop diseases",
    lastUpdated: "2025-02-28"
  },
  {
    id: 3,
    title: "Recyclable E-Waste Materials",
    department: "Materials Science",
    status: "Research Phase",
    sdgs: [12, 13], // Responsible Consumption & Climate Action
    mentors: ["Dr. R. Singh"],
    partners: ["GreenElectronics Inc."],
    description: "Developing biodegradable alternatives for circuit board components",
    lastUpdated: "2025-03-10"
  }
];

// Sample departments data
const departments = [
  "Mechanical Engineering",
  "Computer Science",
  "Electrical Engineering",
  "Civil Engineering",
  "Materials Science",
  "Biotechnology",
  "Electronics & Communication"
];

const Home = () => {
  const [departmentFilter, setDepartmentFilter] = useState("");
  const [sdgFilter, setSdgFilter] = useState("");
  
  // Filter projects based on selected filters
  const filteredProjects = sampleProjects.filter(project => {
    if (departmentFilter && project.department !== departmentFilter) return false;
    if (sdgFilter && !project.sdgs.includes(parseInt(sdgFilter))) return false;
    return true;
  });

  return (
    <main className="home-container">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Tracking Innovation & Sustainable Development</h1>
          <p>Documenting and showcasing academic projects aligned with UN Sustainable Development Goals</p>
          <div className="hero-buttons">
            <Link to="/projects" className="primary-button">Explore Projects</Link>
            <Link to="/collaborate" className="secondary-button">Join as Collaborator</Link>
          </div>
        </div>
        <div className="hero-stats">
          <div className="stat-card">
            <div className="stat-number">{sampleProjects.length}</div>
            <div className="stat-label">Active Projects</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">17</div>
            <div className="stat-label">SDGs Addressed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">12</div>
            <div className="stat-label">Partner Organizations</div>
          </div>
        </div>
      </section>

      {/* 2. SDG Dashboard */}
      <section className="sdg-visualization">
        <div className="section-header">
          <h2>SDG Impact Distribution</h2>
          <p>Explore our contributions toward the UN Sustainable Development Goals</p>
        </div>
        <SDGDashboard projects={sampleProjects} />
      </section>

      {/* 3. Live Project Dashboard */}
      <section className="project-dashboard">
        <div className="section-header">
          <h2>Featured Projects</h2>
          <div className="filter-controls">
            <select 
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
            >
              <option value="">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <select 
              value={sdgFilter}
              onChange={(e) => setSdgFilter(e.target.value)}
            >
              <option value="">All SDGs</option>
              {[...Array(17)].map((_, i) => (
                <option key={i+1} value={i+1}>SDG {i+1}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="project-grid">
          {filteredProjects.length > 0 ? 
            filteredProjects.map(project => (
              <ProjectCard key={project.id} project={project} />
            )) : 
            <div className="no-projects">No projects match the selected filters</div>
          }
        </div>
        <Link to="/projects" className="view-all">View All Projects →</Link>
      </section>

      {/* 4. Collaboration Opportunities */}
      <section className="collaboration-section">
        <div className="section-header">
          <h2>Join Our Ecosystem</h2>
          <p>Opportunities for students, faculty, NGOs, and industry experts</p>
        </div>
        <CollaborationSection />
      </section>

      {/* 5. Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <h2>Success Stories</h2>
        </div>
        <div className="testimonial-slider">
          <div className="testimonial-card">
            <div className="testimonial-content">
              "The TISD platform helped our NGO connect with talented students to solve real community problems. The solar water purifier project is now being implemented in five villages."
            </div>
            <div className="testimonial-author">
              <strong>Priya Desai</strong>
              <span>Director, EcoTech Solutions</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
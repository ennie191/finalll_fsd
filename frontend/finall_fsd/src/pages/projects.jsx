
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProjectsSDG = () => {
  const { id } = useParams();
  const sdgId = id.replace('sdg-', ''); 
  const [sdgInfo, setSdgInfo] = useState(null); 
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const sdgData = {
    "1": { name: "No Poverty", description: "End poverty in all its forms everywhere" },
    "2": { name: "Zero Hunger", description: "End hunger, achieve food security and improved nutrition and promote sustainable agriculture" },
    "3": { name: "Good Health and Well-being", description: "Ensure healthy lives and promote well-being for all at all ages" },
    "4": { name: "Quality Education", description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all" },
    "5": { name: "Gender Equality", description: "Achieving good values" },
    "6": { name: "Clean Water and Sanitation", description: "Ensure availability and sustainable management of water and sanitation for all" },
    "7": { name: "Affordable and Clean Energy", description: "Ensure access to affordable, reliable, sustainable and modern energy for all" },
    "8": { name: "Decent Work and Economic Growth", description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all"},
    "9": { name: "Industry, Innovation, and Infrastructure", description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation"},
    "10": { name: "Reduced Inequalities", description: "Reduce inequality within and among countries" },
    "11": { name: "Sustainable Cities and Communities", description: "Make cities and human settlements inclusive, safe, resilient and sustainable" },
    "12": { name: "Responsible Consumption and Production", description: "Ensure sustainable consumption and production patterns"},
    "13": { name: "Climate Action", description: "Take urgent action to combat climate change and its impacts" },
    "14": { name: "Life Below Water", description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development" },
    "15": { name: "Life on Land", description: "Protect, restore and promote sustainable use of terrestrial ecosystems, sustainably manage forests, combat desertification, and halt and reverse land degradation and halt biodiversity loss"},
    "16": { name: "Peace, Justice and Strong Institutions", description: "Promote peaceful and inclusive societies for sustainable development, provide access to justice for all and build effective, accountable and inclusive institutions at all levels" },
    "17": { name: "Partnerships for the Goals", description: "Strengthen the means of implementation and revitalize the Global Partnership for Sustainable Development" },
  };

  const sampleProjects = {
    "1": [
      { id: 1, title: "Microfinance Initiative for Rural Communities", description: "A student-led project providing microloans to rural entrepreneurs.", groupName: "Empower Rural" },
      { id: 2, title: "Sustainable Housing for Low-Income Families", description: "Designing affordable, eco-friendly homes for low-income families.", groupName: "Green Builders" },
      { id: 3, title: "Skills Training for Unemployed Youth", description: "Training programs to help unemployed youth gain new skills and find jobs.", groupName: "Skill Up" },
    ],
    "2": [
      { id: 1, title: "Food Security through Urban Farming", description: "Teaching urban communities how to grow their own food.", groupName: "Urban Growers" },
      { id: 2, title: "Nutrition Education for Children", description: "Educating children and parents about healthy eating and nutrition.", groupName: "Healthy Kids" },
      { id: 3, title: "Zero-Waste Cooking Workshops", description: "Promoting sustainable cooking practices to reduce food waste.", groupName: "Wasteless Kitchen" },
    ],
    "3": [
      { id: 1, title: "Mental Health Awareness Campaign", description: "Raising awareness about mental health and well-being in schools and communities.", groupName: "Mind Matters" },
    ],
    "4": [
      { id: 1, title: "STEM Education", description: "Providing STEM education and resources to underprivileged schools and students", groupName: "STEM Stars" },
      ],
    "5": [
      { id: 1, title: "foof security", description: "Educating children and parents about healthy eating and nutrition.", groupName: "Healthy Kids" },
    ],
    "6": [
      { id: 1, title: "Water purification", description: "Providing clean water to rural communities.", groupName: "Clean Water Initiative" },
    ],
    "7": [
      { id: 1, title: "Solar Energy for Rural Villages", description: "Providing solar panels and training to rural communities.", groupName: "Solar Power Project" },
    ],
    "8": [
      { id: 1, title: "Youth Employment Program", description: "Creating job opportunities for young people in underserved communities.", groupName: "YouthWorks" },
    ],
    "9": [
      { id: 1, title: "Innovation Hub for Entrepreneurs", description: "Supporting startups and entrepreneurs with resources and mentorship.", groupName: "Innovate Now" },
    ],
    "10": [
      { id: 1, title: "Equality and Inclusion Workshops", description: "Promoting diversity and inclusion in schools and workplaces.", groupName: "Equal Voices" },
    ],
    "11": [
      { id: 1, title: "Sustainable Urban Planning", description: "Designing eco-friendly cities and communities for the future.", groupName: "Green City Planners" },
    ],
    "12": [
      { id: 1, title: "Recycling and Waste Management", description: "Implementing recycling programs and waste management solutions in local communities.", groupName: "Eco Warriors" },
    ],
    "13": [
      { id: 1, title: "Climate Change Education", description: "Teaching students and communities about climate change and sustainability.", groupName: "Eco Warriors" },
    ],
    "14": [
      { id: 1, title: "Marine Conservation Project", description: "Protecting marine life and habitats through conservation efforts.", groupName: "Ocean Guardians" },
    ],
    "15": [
      { id: 1, title: "Reforestation Initiative", description: "Planting trees and restoring natural habitats to preserve biodiversity.", groupName: "Green Earth" },
    ],
    "16": [
      { id: 1, title: "Legal Aid and Justice Program", description: "Providing legal assistance and support to marginalized communities.", groupName: "Justice Now" },
    ],
    "17": [
      { id: 1, title: "Community Partnerships for Sustainable Development", description: "Building collaborations between NGOs, businesses, and local communities.", groupName: "Global Impact" },
    ],
  };

  useEffect(() => {
    setTimeout(() => {
      setSdgInfo(sdgData[sdgId]);
      setProjects(sampleProjects[sdgId]);
      setLoading(false);
    }, 800);
  }, [sdgId]);

  if (loading) {
    return <div className="loading">Loading projects...</div>;
  }

  if (!sdgInfo || !projects || projects.length === 0) {
    return <div className="error">No projects found for this SDG.</div>;
  }

  return (
    <div className={`sdg-page sdg-${sdgId}`}>
      <div className="sdg-header">
        <div className="sdg-icon-container">
          <div className="sdg-number">{sdgId}</div>
        </div>
        <div className="sdg-title-container">
          <h1>{sdgInfo.name}</h1>
          <p className="sdg-description">{sdgInfo.description}</p>
        </div>
      </div>

      <div className="projects-container">
        <h2>Student Projects</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div className="project-box" key={project.id}>
              <div className="project-title">
                <h3>{project.groupName}</h3>
              </div>
              <div className="project-description">
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSDG;

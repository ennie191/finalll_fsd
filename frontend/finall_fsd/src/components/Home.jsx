import React from 'react';
import { Link } from 'react-router-dom';
import ProjectCard from '../components/ProjectCard';
import SDGDashboard from '../components/SDGDashboard';

const sampleProjects = [
  {
    id: 1,
    title: "Solar Water Purifier",
    department: "Mechanical Engineering",
    status: "Prototype Phase",
    sdgs: [6, 7],
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
    sdgs: [2, 9],
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
    sdgs: [12, 13],
    mentors: ["Dr. R. Singh"],
    partners: ["GreenElectronics Inc."],
    description: "Developing biodegradable alternatives for circuit board components",
    lastUpdated: "2025-03-10"
  }
];

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    alt: "Solar panel installation",
    caption: "Renewable Energy Project"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Water purification system",
    caption: "Clean Water Initiative"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1581093450021-4a7360e9a6f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Students working in lab",
    caption: "Research & Development"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Team collaboration",
    caption: "Project Team Meeting"
  }
];

const Home = () => {
  const scrollToDashboard = () => {
    const dashboardSection = document.getElementById('sdg-dashboard');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white rounded-xl p-8 mb-16 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
        <div className="relative z-10 max-w-3xl mx-auto text-center py-20">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
            Empowering Innovation with Sustainable Goals
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-400">
            Explore academic projects aligned with the UN Sustainable Development Goals.
          </p>
          <button
            onClick={scrollToDashboard}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 rounded-full font-medium text-lg hover:from-blue-600 hover:to-purple-600 hover:shadow-lg transition-all"
          >
            Explore Projects
          </button>
        </div>
      </section>

      {/* SDG Dashboard */}
      <section id="sdg-dashboard" className="mb-16">
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4"></h2>
            <p className="text-gray-400">
             
            </p>
          </div>
          <div className="relative">
            <SDGDashboard projects={sampleProjects} />
          </div>
        </div>
      </section>

     {/* Featured Projects */}
     <section className="mb-16">
       <div className="text-center mb-8">
         <h2 className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 !important">
           Featured Projects
         </h2>
         <p className="text-gray-400">Discover our innovative sustainability initiatives</p>
       </div>
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {sampleProjects.map((project) => (
           <ProjectCard key={project.id} project={project} />
         ))}
       </div>
     </section>

{/* Gallery Section */}
<section id="gallery" className="mb-16">
  <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white rounded-xl p-8 shadow-lg">
    <div className="text-center mb-8">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
        Project Gallery
      </h2>
      <p className="text-gray-400">See our initiatives in action</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {galleryImages.map((image) => (
        <div key={image.id} className="relative group overflow-hidden rounded-xl border border-gray-700 shadow-lg">
          <img 
            src={image.src} 
            alt={image.alt}
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
            <div className="text-white">
              <p className="font-medium">{image.caption}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Testimonials */}
<section className="mb-16">
  <div className="text-center mb-8">
    <h2 className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
      Success Stories
    </h2>
  </div>
  <div className="max-w-3xl mx-auto">
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
      <div className="text-gray-300 text-lg italic mb-4">
        "The TISD platform helped our NGO connect with talented students to solve real community problems. The solar water purifier project is now being implemented in five villages."
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-white">Priya Desai</span>
        <span className="text-gray-400">Director, EcoTech Solutions</span>
      </div>
    </div>
  </div>
</section>
    </main>
  );
};

export default Home;
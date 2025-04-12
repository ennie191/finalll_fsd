// components/Collaborators.js
import React from 'react';

const Collaborators = () => {
  const collaborators = [
    {
      id: 1,
      name: "ECOARMY",
      logo: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=EA",
      type: "Environmental Collective",
      projects: ["Coastal Cleanup", "Tree Planting Drives"],
    },
    {
      id: 2,
      name: "focolare",
      logo: "https://via.placeholder.com/150/2196F3/FFFFFF?text=FO",
      type: "Global Movement",
      projects: ["Community Building", "Youth Programs"],
    },
    {
      id: 3,
      name: "Handmaids of Blessed Trinity",
      logo: "https://via.placeholder.com/150/9C27B0/FFFFFF?text=HB",
      type: "Religious Organization",
      projects: ["Education Initiatives", "Healthcare Outreach"],
    },
    {
      id: 4,
      name: "Mumbai BEACH",
      logo: "https://via.placeholder.com/150/FF9800/FFFFFF?text=MB",
      type: "Conservation Group",
      projects: ["Marine Protection", "Eco-Tourism"],
    },
    {
      id: 5,
      name: "AAJI CARE",
      logo: "https://via.placeholder.com/150/E91E63/FFFFFF?text=AC",
      type: "Healthcare Network",
      projects: ["Elderly Care", "Mobile Clinics"],
    },
    {
      id: 6,
      name: "SankalpTaru",
      logo: "https://via.placeholder.com/150/FF5722/FFFFFF?text=ST",
      type: "Tree Plantation NGO",
      projects: ["Urban Greening", "Biodiversity Projects"],
    },
    {
      id: 7,
      name: "GreenPeace",
      logo: "https://via.placeholder.com/150/8BC34A/FFFFFF?text=GP",
      type: "Environmental NGO",
      projects: ["Climate Action", "Wildlife Protection"],
    },
    {
      id: 8,
      name: "UNICEF",
      logo: "https://via.placeholder.com/150/3F51B5/FFFFFF?text=UN",
      type: "Children's Fund",
      projects: ["Child Welfare", "Education Programs"],
    },
    {
      id: 9,
      name: "World Wildlife Fund",
      logo: "https://via.placeholder.com/150/FFEB3B/FFFFFF?text=WW",
      type: "Wildlife Conservation",
      projects: ["Endangered Species", "Habitat Preservation"],
    },
  ];

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-100 mb-4 font-serif tracking-tight">
          Our <span className="text-green-400">Allies</span> in Change
        </h1>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Organizations joining hands with us to create sustainable impact
        </p>
      </div>

      {/* Collaborators Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborators.map((collab) => (
          <div
            key={collab.id}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700 overflow-hidden group h-full flex flex-col"
          >
            <div className="p-6 flex-grow">
              {/* Logo and Name */}
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={collab.logo}
                  alt={collab.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 shadow-md"
                />
                <div>
                  <h3 className="text-xl font-bold text-white">{collab.name}</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">{collab.type}</p>
                </div>
              </div>

              {/* Projects */}
              <div className="mb-4">
                <h4 className="text-xs font-semibold text-gray-500 mb-2">PROJECTS</h4>
                <ul className="space-y-1 text-sm">
                  {collab.projects.map((project, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-400 mr-1">•</span>
                      <span className="text-gray-300">{project}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-20 text-center">
        <p className="text-gray-400 mb-4">Interested in collaborating with us?</p>
        <button className="px-8 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors shadow-lg">
          Connect With Our Team
        </button>
      </div>
    </div>
  );
};

export default Collaborators;
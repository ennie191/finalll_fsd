import React, { useState, useEffect } from 'react';

const Collaborators = () => {
  const [collaborators, setCollaborators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const STUDENT_ID = "6800e357fb69aeea30cb3ae3";
  const COLLABORATOR_ID = "6800e357fb69aeea30cb3ae4";

  useEffect(() => {
    const fetchCollaborators = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/collaborators');
        const data = await response.json();
        console.log('Collaborators:', data);
        setCollaborators(data);
      } catch (error) {
        setError('Failed to fetch collaborators');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborators();
  }, []);

  const handleCollaborationRequest = async (collaboratorId) => {
    try {
      const response = await fetch('http://localhost:5000/api/collaboration/request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId: STUDENT_ID,
          collaboratorId: collaboratorId,
        }),
      });

      if (!response.ok) throw new Error('Failed to send request');
      alert('Collaboration request sent successfully!');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to send request');
    }
  };

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=No+Image';
  };

  if (loading) return <div>Loading collaborators...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-100 mb-4 font-serif tracking-tight">
          Our <span className="text-green-400">Allies</span> in Change
        </h1>
        <div className="w-24 h-1 bg-green-500 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Organizations joining hands with us to create sustainable impact
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collaborators.map((collab) => (
          <div
            key={collab._id}
            className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700 overflow-hidden group h-full flex flex-col"
          >
            <div className="p-6 flex-grow">
              <div className="flex items-center gap-4 mb-4">
                {/* <img
                  src={collab.logo}
                  alt={collab.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-700 shadow-md"
                  onError={handleImageError}
                /> */}
                <div>
                  <h3 className="text-xl font-bold text-white">{collab.name}</h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">{collab.type}</p>
                </div>
              </div>

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
    </div>
  );
};

export default Collaborators;
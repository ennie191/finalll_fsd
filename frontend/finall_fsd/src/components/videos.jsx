import React from 'react';

const VideoGallery = () => {
  const videoProjects = [
    {
      id: 1,
      title: "Solar Water Purifier",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video URL
      department: "Mechanical Engineering",
      description: "Low-cost solar-powered water purification system"
    },
    {
      id: 2,
      title: "AI Crop Disease Detection",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video URL
      department: "Computer Science",
      description: "Mobile app using computer vision to identify crop diseases"
    },
    {
      id: 3,
      title: "E-Waste Recycling",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video URL
      department: "Materials Science",
      description: "Developing biodegradable alternatives for circuit boards"
    },
    {
      id: 4,
      title: "Smart Irrigation System",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with your actual video URL
      department: "Electronics",
      description: "IoT-based water conservation for farms"
    }
  ];

  return (
    <section className="py-12 px-4 bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-2">Project Videos</h2>
          <p className="text-gray-400">See our projects in action</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoProjects.map((project) => (
            <div 
              key={project.id} 
              className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-700 overflow-hidden group h-full flex flex-col"
              style={{ width: '100%', height: '400px' }} // Adjust width and height
            >
              {/* Video Embed */}
              <div className="relative pt-[56.25%] h-3/5"> {/* 16:9 Aspect Ratio */}
                <iframe
                  src={project.videoUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={project.title}
                ></iframe>
              </div>

              {/* Project Info */}
              <div className="p-4 flex-grow">
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-sm text-gray-400 mb-2">{project.department}</p>
                <p className="text-gray-300 text-sm">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as THREE from 'three';
import ProjectCard from '../components/ProjectCard';
import SDGDashboard from '../components/SDGDashboard';
import waterImage from '../assets/water.jpg';
import studentImage from '../assets/students.jpg';
import windImage from '../assets/wind.jpg';
import recycleImage from '../assets/recycle.webp';
// Import Three.js modules conditionally to prevent SSR issues
let OrbitControls;
let GLTFLoader;

// We'll import these only in the browser environment
if (typeof window !== 'undefined') {
  import('three/examples/jsm/controls/OrbitControls').then(module => {
    OrbitControls = module.OrbitControls;
  });
  
  import('three/examples/jsm/loaders/GLTFLoader').then(module => {
    GLTFLoader = module.GLTFLoader;
  });
}

const sampleProjects = [
  {
    id: 1,
    title: "Solar Water Purifier",
    department: "Mechanical Engineering",
    mentors: ["Dr. A. Sharma"],
    partners: ["EcoTech Solutions"],
    description: "Low-cost solar-powered water purification system for rural communities",
    achievement: "Won 1st prize in National Innovation Hackathon at IIT Bombay",
  },
  {
    id: 2,
    title: "AI for Crop Disease Detection",
    department: "Computer Science",
    mentors: ["Prof. M. Patel", "Dr. S. Kapoor"],
    partners: ["AgriTech Foundation"],
    description: "Mobile app using computer vision to identify crop diseases",
    achievement: "Recognized as Best AI Project at AgriTech Ideathon 2025",
  },
  {
    id: 3,
    title: "Recyclable E-Waste Materials",
    department: "Materials Science",
    mentors: ["Dr. R. Singh"],
    partners: ["GreenElectronics Inc."],
    description: "Developing biodegradable alternatives for circuit board components",
    achievement: "Finalist in Global Sustainability Challenge at MIT",
  }
];

// Sample gallery images
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80",
    alt: "Solar panel installation",
  },
  {
    id: 2,
  src: waterImage,
  alt: "Water purification system",
  },
  {
    id: 3,
    src: studentImage,
    alt: "Students researching in lab",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Team collaboration",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Tree planting activity",
  },
  {
    id: 6,
    src: windImage,
    alt: "Wind turbines",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Community workshop",
  },
  {
    id: 8,
    src: recycleImage,
    alt: "Recycling initiative",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    alt: "Educational seminar",
  }
];

const Globe3D = () => {
  const mountRef = useRef(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    let cleanup = null;
    
    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000814);
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
      camera.position.z = 2;
      
      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(300, 300);
      
      // Check if mountRef is still available before appending
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      } else {
        return; // Exit if mount point is no longer available
      }
      
      // Create globe
      const geometry = new THREE.SphereGeometry(1, 32, 32);
      
      // Create material with enhanced blue/green glow effect
      const material = new THREE.MeshPhongMaterial({
        color: 0x0066ff,          // Bright blue base color
        shininess: 60,            // Increased shininess
        emissive: 0x00aaff,       // Strong blue emissive glow
        emissiveIntensity: 0.5,   // Increased emissive intensity
        specular: 0x66ffff        // Cyan specular highlights
      });
      
      const globe = new THREE.Mesh(geometry, material);
      scene.add(globe);
      
      // Add continent markers to make rotation visible
      const continentGeometry = new THREE.SphereGeometry(0.05, 16, 16);
      const continentMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        emissive: 0x00ff88,
        emissiveIntensity: 0.7
      });
      
      // Add multiple continent markers at different positions on the globe
      const continentPositions = [
        [0, 0.8, 0.6],     // North America
        [0.7, 0.4, 0.6],   // Europe
        [-0.7, 0.3, 0.7],  // Asia
        [0, -0.7, 0.7],    // South America
        [0.6, -0.6, 0.5],  // Africa
        [-0.8, -0.6, 0.2]  // Australia
      ];
      
      continentPositions.forEach(position => {
        const continent = new THREE.Mesh(continentGeometry, continentMaterial);
        continent.position.set(...position);
        globe.add(continent);
      });
      
      // Add meridian lines to make rotation more visible
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI;
        
        const meridianGeometry = new THREE.TorusGeometry(1, 0.01, 16, 50, Math.PI);
        const meridianMaterial = new THREE.MeshBasicMaterial({ 
          color: 0x66ffff,
          transparent: true,
          opacity: 0.3
        });
        
        const meridian = new THREE.Mesh(meridianGeometry, meridianMaterial);
        meridian.rotation.x = Math.PI / 2;
        meridian.rotation.y = angle;
        globe.add(meridian);
      }
      
      // Add equator
      const equatorGeometry = new THREE.TorusGeometry(1, 0.01, 16, 100);
      const equatorMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xffaa00,
        transparent: true,
        opacity: 0.4
      });
      
      const equator = new THREE.Mesh(equatorGeometry, equatorMaterial);
      equator.rotation.x = Math.PI / 2;
      globe.add(equator);
      
      // Add ambient light
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambientLight);
      
      // Add directional light
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);
      
      // Add point light inside globe for inner glow effect
      const pointLight = new THREE.PointLight(0x00aaff, 0.8, 3);
      pointLight.position.set(0, 0, 0);
      scene.add(pointLight);
      
      // Increase rotation speed for more noticeable movement
      const animate = () => {
        if (!mountRef.current) return; // Check if component is still mounted
        
        requestAnimationFrame(animate);
        globe.rotation.y += 0.01; // Increased rotation speed
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Cleanup function
      cleanup = () => {
        if (mountRef.current && renderer.domElement) {
          try {
            mountRef.current.removeChild(renderer.domElement);
          } catch (e) {
            console.log("Cleanup error handled:", e);
          }
        }
      };
    } catch (err) {
      setError("Could not initialize 3D globe");
      console.error("Globe3D error:", err);
    }
    
    // Return cleanup function
    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 w-64 bg-gray-800 rounded-full">
        <div className="text-blue-400 text-center p-4">
          <div className="text-5xl mb-2">🌎</div>
          <p>Interactive globe</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center">
      <div ref={mountRef} className="rounded-full overflow-hidden shadow-lg h-64 w-64"></div>
    </div>
  );
};

// Simplified Tech Component (no model loading)
const TechVisualization = () => {
  const mountRef = useRef(null);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!mountRef.current) return;
    
    let cleanup = null;
    
    try {
      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x111827);
      
      // Camera setup
      const camera = new THREE.PerspectiveCamera(75, 16/9, 0.1, 1000);
      camera.position.set(0, 0, 5);
      
      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(640, 360);
      
      // Check if mountRef is still available before appending
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement);
      } else {
        return; // Exit if mount point is no longer available
      }
      
      // Add lights
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);
      
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(directionalLight);
      
      // Create a simplified laptop model with basic geometry
      const laptopBase = new THREE.Group();
      
      // Base of laptop
      const baseGeometry = new THREE.BoxGeometry(3, 0.2, 2);
      const baseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x333333,
        shininess: 60
      });
      const base = new THREE.Mesh(baseGeometry, baseMaterial);
      laptopBase.add(base);
      
      // Screen of laptop
      const screenBaseGeometry = new THREE.BoxGeometry(2.8, 0.1, 1.8);
      const screenBaseMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x222222 
      });
      const screenBase = new THREE.Mesh(screenBaseGeometry, screenBaseMaterial);
      screenBase.position.set(0, 0.2, 0);
      laptopBase.add(screenBase);
      
      // Screen display (glowing)
      const screenDisplayGeometry = new THREE.PlaneGeometry(2.6, 1.6);
      const screenDisplayMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x0066aa,
        emissive: 0x0088ff,
        emissiveIntensity: 0.5,
        shininess: 90
      });
      const screenDisplay = new THREE.Mesh(screenDisplayGeometry, screenDisplayMaterial);
      screenDisplay.position.set(0, 0.25, 0.01);
      screenDisplay.rotation.x = -0.1; // Slightly tilted screen
      laptopBase.add(screenDisplay);
      
      // Optional - Add SDG icons as cubes hovering above
      const iconSize = 0.3;
      const iconGeometry = new THREE.BoxGeometry(iconSize, iconSize, iconSize);
      
      const colors = [0x1a73e8, 0x34a853, 0xfbbc04, 0xea4335, 0x4285f4];
      
      for (let i = 0; i < 5; i++) {
        const iconMaterial = new THREE.MeshPhongMaterial({ 
          color: colors[i],
          emissive: colors[i],
          emissiveIntensity: 0.2
        });
        
        const icon = new THREE.Mesh(iconGeometry, iconMaterial);
        
        // Position icons in a circular pattern above laptop
        const angle = (i / 5) * Math.PI * 2;
        const radius = 1.2;
        icon.position.set(
          Math.cos(angle) * radius, 
          0.8 + Math.sin(i * 0.5) * 0.2, // Vary height slightly
          Math.sin(angle) * radius
        );
        
        laptopBase.add(icon);
      }
      
      scene.add(laptopBase);
      
      // Animation
      const animate = () => {
        if (!mountRef.current) return; // Check if component is still mounted
        
        requestAnimationFrame(animate);
        laptopBase.rotation.y += 0.005;
        renderer.render(scene, camera);
      };
      
      animate();
      
      // Cleanup function
      cleanup = () => {
        if (mountRef.current && renderer.domElement) {
          try {
            mountRef.current.removeChild(renderer.domElement);
          } catch (e) {
            console.log("Cleanup error handled:", e);
          }
        }
      };
    } catch (err) {
      setError("Could not initialize 3D visualization");
      console.error("TechVisualization error:", err);
    }
    
    // Return cleanup function
    return () => {
      if (cleanup) cleanup();
    };
  }, []);
  
  if (error) {
    return (
      <div className="flex justify-center items-center h-64 w-full bg-gray-800 rounded-lg">
        <div className="text-blue-400 text-center p-4">
          <div className="text-5xl mb-2">💻</div>
          <p>Interactive technology display</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="flex justify-center items-center">
      <div ref={mountRef} className="rounded-lg overflow-hidden shadow-lg h-64 w-full"></div>
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);

  const handleGalleryClick = (e) => {
    e.preventDefault();
    navigate('/#gallery');
    setTimeout(() => {
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
    setShowMediaDropdown(false); // Close dropdown
  };

  return (
    <Link
      to="/#gallery"
      onClick={handleGalleryClick}
      className="block px-4 py-2 text-sm text-white hover:bg-blue-600 hover:text-white transition-all"
    >
      Gallery
    </Link>
  );
};

const Home = () => {
  const scrollToDashboard = () => {
    const dashboardSection = document.getElementById('sdg-dashboard');
    if (dashboardSection) {
      dashboardSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section with 3D Globe */}
      <section className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white rounded-xl p-8 mb-16 overflow-hidden shadow-lg">
        <div className="absolute inset-0 bg-dots-pattern opacity-10"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-2 relative z-10 max-w-3xl py-10">
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
          <div className="hidden md:flex items-center justify-center">
            <Globe3D />
          </div>
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

      {/* 3D Tech Visualization Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-br from-gray-900 via-black to-gray-800 rounded-xl p-8 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
                Cutting-Edge Technology for Sustainable Solutions
              </h2>
              <p className="text-gray-300 mb-6">
                Our platform uses advanced technologies to help researchers and stakeholders collaborate on sustainable development projects.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <span className="mr-2 text-green-500">✓</span> Real-time project tracking and analytics
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2 text-green-500">✓</span> AI-powered matching of projects with mentors
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="mr-2 text-green-500">✓</span> Interactive visualization of SDG impact
                </li>
              </ul>
            </div>
            <div>
              <TechVisualization />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
            Achievements
          </h2>
          <p className="text-gray-400">Celebrating our innovative and award-winning projects</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} isAchievement={true} />
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="mb-16 pb-16">
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white rounded-xl p-8 shadow-lg">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
              Project Gallery
            </h2>
            <p className="text-gray-400">See our initiatives in action</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.slice(0, 9).map((image) => (
              <div key={image.id} className="relative group overflow-hidden rounded-xl border border-gray-700 shadow-lg">
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <div className="text-white">
                    <p className="font-medium">{image.alt}</p>
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

      <Navbar />
    </main>
  );
};

export default Home;
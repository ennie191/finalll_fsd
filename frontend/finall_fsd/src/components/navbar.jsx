import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img.jpg";

const Navbar = () => {
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);
  const navigate = useNavigate();

  const handleGalleryClick = (e) => {
    e.preventDefault();
    navigate('/'); // Navigate to the Home page
    setTimeout(() => {
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth', block: 'start' }); // Align to the top
      }
    }, 100); // Delay to ensure the Home page is loaded
    setShowMediaDropdown(false); // Close dropdown
  };

  return (
    <nav className="bg-gradient-to-br from-gray-900 via-black to-gray-800 px-6 py-4 flex justify-between items-center shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center">
        <img src={logo} alt="College Logo" className="h-12 w-auto mr-4" />
        <div className="flex flex-col">
          <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
            TISD
          </span>
          <span className="text-base text-gray-300 font-medium tracking-wide">
            Tracking Innovation for Sustainable Development
          </span>
        </div>
      </div>

      {/* Navbar Links */}
      <div>
        <ul className="flex space-x-6 items-center">
          {/* Home Button */}
          <li>
            <Link
              to="/"
              className="px-6 py-2 rounded-md text-white font-medium bg-gradient-to-br from-gray-800 to-gray-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-500/50 hover:shadow-lg transition-all transform hover:scale-105"
            >
              Home
            </Link>
          </li>

          {/* Mentors Button */}
          <li>
            <Link
              to="/mentors"
              className="px-6 py-2 rounded-md text-white font-medium bg-gradient-to-br from-gray-800 to-gray-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-500/50 hover:shadow-lg transition-all transform hover:scale-105"
            >
              Mentors
            </Link>
          </li>

          {/* Collaborators Button */}
          <li>
            <Link
              to="/collaborators"
              className="px-6 py-2 rounded-md text-white font-medium bg-gradient-to-br from-gray-800 to-gray-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-500/50 hover:shadow-lg transition-all transform hover:scale-105"
            >
              Collaborators
            </Link>
          </li>

          {/* Media Dropdown */}
          <li className="relative">
            <button
              onClick={() => setShowMediaDropdown(!showMediaDropdown)}
              className="px-6 py-2 rounded-md text-white font-medium bg-gradient-to-br from-gray-800 to-gray-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-500/50 hover:shadow-lg transition-all transform hover:scale-105 flex items-center"
            >
              Media
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showMediaDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-gradient-to-br from-gray-900 to-gray-800 rounded-md shadow-lg z-10">
                <Link
                  to="/media/videos"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-600 hover:text-white transition-all"
                  onClick={() => setShowMediaDropdown(false)} // Close dropdown after clicking
                >
                  Videos
                </Link>
                <button
                  onClick={handleGalleryClick}
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-600 hover:text-white transition-all"
                >
                  Gallery
                </button>
              </div>
            )}
          </li>

          {/* Contact Button */}
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                const footerSection = document.getElementById('footer');
                if (footerSection) {
                  footerSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-6 py-2 rounded-md text-white font-medium bg-gradient-to-br from-gray-800 to-gray-700 hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-700 hover:shadow-blue-500/50 hover:shadow-lg transition-all transform hover:scale-105"
            >
              Contact
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
import React from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGlobe
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-300 py-16 px-5 flex flex-col w-full shadow-[0_-5px_15px_rgba(0,0,0,0.4)]"
    >
      <div className="flex justify-around flex-wrap max-w-6xl mx-auto w-full gap-10">
        {/* About Column */}
        <div className="flex-1 min-w-[300px] px-4">
          <h3 className="text-xl font-bold mb-5 border-b border-gray-700 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
            About TISD Platform
          </h3>
          <p className="text-gray-400 my-3 flex items-center gap-3">
            <FaGlobe /> Tracking Innovation & Sustainable Development initiative connecting academic projects with UN SDGs and global collaborators.
          </p>
          <div className="flex gap-5 my-6">
            {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, index) => (
              <a 
                key={index} 
                href="#" 
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-800 shadow-md text-blue-400 transition-all duration-300 hover:shadow-lg hover:text-blue-300 hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* SDG Links Column */}
        <div className="flex-1 min-w-[300px] px-4">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
            {/* Add SDG links or content here */}
          </div>
        </div>

        {/* Contact Column */}
        <div className="flex-1 min-w-[250px] px-4">
          <h3 className="text-xl font-bold mb-5 border-b border-gray-700 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
            Get In Touch
          </h3>
          <a href="mailto:contact@tisd.org" className="text-gray-400 my-3 flex items-center gap-3 cursor-pointer transition-all duration-300 no-underline hover:text-blue-300">
            <FaEnvelope /> contact@tisd.org
          </a>
          <a href="tel:+919876543210" className="text-gray-400 my-3 flex items-center gap-3 cursor-pointer transition-all duration-300 no-underline hover:text-blue-300">
            <FaPhone /> +91 98765 43210
          </a>
          <p className="text-gray-400 my-3 flex items-center gap-3">
            <FaMapMarkerAlt /> Mumbai, India
          </p>
        </div>
      </div>

      <div className="mt-10 text-center text-gray-500 text-sm border-t border-gray-700 pt-5 w-full">
        &copy; {new Date().getFullYear()} TISD Platform. All Rights Reserved. | 
        <a href="/privacy" className="mx-2 text-gray-400 inline hover:text-blue-300 transition-all duration-300">Privacy Policy</a> | 
        <a href="/terms" className="text-gray-400 inline hover:text-blue-300 transition-all duration-300">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
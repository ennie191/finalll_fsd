import React, { useState } from "react";
import logo from "../assets/img.jpg";
import "../styles/navbar.css"; // Ensure to create/update this CSS file

const Navbar = () => {
  const [showSDGDropdown, setShowSDGDropdown] = useState(false);
  const [showMediaDropdown, setShowMediaDropdown] = useState(false);

  const sdgs = [
    { id: 1, name: "No Poverty" },
    { id: 2, name: "Zero Hunger" },
    { id: 3, name: "Good Health and Well-being" },
    { id: 4, name: "Quality Education" },
    { id: 5, name: "Gender Equality" },
    { id: 6, name: "Clean Water and Sanitation" },
    { id: 7, name: "Affordable and Clean Energy" },
    { id: 8, name: "Decent Work and Economic Growth" },
    { id: 9, name: "Industry, Innovation, and Infrastructure" },
    { id: 10, name: "Reduced Inequalities" },
    { id: 11, name: "Sustainable Cities and Communities" },
    { id: 12, name: "Responsible Consumption and Production" },
    { id: 13, name: "Climate Action" },
    { id: 14, name: "Life Below Water" },
    { id: 15, name: "Life on Land" },
    { id: 16, name: "Peace, Justice and Strong Institutions" },
    { id: 17, name: "Partnerships for the Goals" }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="College Logo" className="college-logo" />
        <div className="brand">
          <span className="brand-text">TISD</span>
          <span className="brand-tagline">
            Technology Innovation for Sustainable Development
          </span>
        </div>
      </div>

      <div className="navbar-right">
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>

          <li className="dropdown">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowSDGDropdown(!showSDGDropdown);
                if (showMediaDropdown) setShowMediaDropdown(false);
              }}
            >
              Projects <i className="arrow-down"></i>
            </a>
            {showSDGDropdown && (
              <div className="dropdown-content sdg-dropdown">
                {sdgs.map((sdg) => (
                  <a key={sdg.id} href={`/projects/sdg-${sdg.id}`}>
                    <span className="sdg-number">{sdg.id}</span> {sdg.name}
                  </a>
                ))}
              </div>
            )}
          </li>

          <li>
            <a href="/mentors">Mentors</a>
          </li>
          <li>
            <a href="/collaborators">Collaborators</a>
          </li>

          <li className="dropdown">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setShowMediaDropdown(!showMediaDropdown);
                if (showSDGDropdown) setShowSDGDropdown(false);
              }}
            >
              Media <i className="arrow-down"></i>
            </a>
            {showMediaDropdown && (
              <div className="dropdown-content">
                <a href="/media/videos">Videos</a>
                <a href="/media/gallery">Gallery</a>
              </div>
            )}
          </li>

          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

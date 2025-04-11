import React from "react";
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram, 
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaProjectDiagram,
  FaGlobe
} from "react-icons/fa";

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#0a1e36",
    color: "white",
    padding: "60px 20px 30px",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    boxShadow: "0px -5px 15px rgba(0, 0, 0, 0.4)",
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    gap: "40px"
  };

  const columnStyle = {
    flex: "1",
    minWidth: "250px",
    padding: "0 15px"
  };

  const headingStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "cyan",
    marginBottom: "20px",
    borderBottom: "2px solid rgba(0, 255, 255, 0.3)",
    paddingBottom: "10px"
  };

  const textStyle = {
    color: "#B0BEC5",
    margin: "12px 0",
    display: "flex",
    alignItems: "center",
    gap: "12px"
  };

  const linkStyle = {
    ...textStyle,
    cursor: "pointer",
    transition: "all 0.3s ease",
    textDecoration: "none",
    color: "#B0BEC5",
    ':hover': {
      color: "cyan"
    }
  };

  const iconContainerStyle = {
    display: "flex",
    gap: "20px",
    margin: "25px 0"
  };

  const iconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
    backgroundColor: "#0C1E22",
    boxShadow: "4px 4px 8px #071015, -4px -4px 8px #0D2025",
    color: "cyan",
    transition: "all 0.3s ease",
  };

  const bottomStyle = {
    marginTop: "40px",
    textAlign: "center",
    color: "#90A4AE",
    fontSize: "14px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    paddingTop: "20px",
    width: "100%"
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* About Column - Expanded */}
        <div style={{ ...columnStyle, minWidth: "300px" }}>
          <h3 style={headingStyle}>About TISD Platform</h3>
          <p style={textStyle}>
            <FaGlobe /> Tracking Innovation & Sustainable Development initiative connecting academic projects with UN SDGs and global collaborators.
          </p>
          <div style={iconContainerStyle}>
            {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, index) => (
              <a 
                key={index} 
                href="#" 
                style={iconStyle}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0px 0px 15px cyan";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "4px 4px 8px #071015, -4px -4px 8px #0D2025";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* SDG Links Column - Expanded */}
        <div style={{ ...columnStyle, minWidth: "300px" }}>
          
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))", 
            gap: "12px" 
          }}>
            
           
          </div>
        </div>

        {/* Contact Column - Expanded */}
        <div style={{ ...columnStyle, minWidth: "250px" }}>
          <h3 style={headingStyle}>Get In Touch</h3>
          <a href="mailto:contact@tisd.org" style={linkStyle}>
            <FaEnvelope /> contact@tisd.org
          </a>
          <a href="tel:+919876543210" style={linkStyle}>
            <FaPhone /> +91 98765 43210
          </a>
          <p style={textStyle}>
            <FaMapMarkerAlt /> Mumbai, India
          </p>
          <a href="/submit-project" style={{
            ...linkStyle,
            marginTop: "20px",
            color: "cyan",
            fontWeight: "bold"
          }}>
            <FaProjectDiagram /> Submit Your Project
          </a>
        </div>
      </div>

      <div style={bottomStyle}>
        &copy; {new Date().getFullYear()} TISD Platform. All Rights Reserved. | 
        <a href="/privacy" style={{ ...linkStyle, margin: "0 10px", display: "inline" }}>Privacy Policy</a> | 
        <a href="/terms" style={{ ...linkStyle, display: "inline" }}>Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;
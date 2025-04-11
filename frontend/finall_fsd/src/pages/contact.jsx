import React from 'react';


const Contact = () => {
  return (
    <div className="contact">
      <h2>Contact Us</h2>
      <div className="contact-wrapper">
        <div className="contact-person left">
          <h3>John Doe</h3>
          <p>Email: <a href="mailto:johndoe@example.com">johndoe@example.com</a></p>
          <p>Phone: <a href="tel:+1234567890">+1 234 567 890</a></p>
        </div>
        <div className="separator"></div>
        <div className="contact-person right">
          <h3>Jane Smith</h3>
          <p>Email: <a href="mailto:janesmith@example.com">janesmith@example.com</a></p>
          <p>Phone: <a href="tel:+0987654321">+0 987 654 321</a></p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

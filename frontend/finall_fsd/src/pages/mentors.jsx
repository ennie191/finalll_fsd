import React from 'react';

const Mentors = () => {
  return (
    <div className="mentors-section">
      <h2>Our Mentors</h2>
      <div className="mentors-container">
        <div className="mentor-box">
          <img src="https://via.placeholder.com/150" alt="Mentor 1" />
          <h3>Dr. Alice Johnson</h3>
          <p>Expert in Sustainable Development</p>
        </div>
        <div className="mentor-box">
          <img src="https://via.placeholder.com/150" alt="Mentor 2" />
          <h3>Prof. John Smith</h3>
          <p>Specialist in Urban Farming</p>
        </div>
        <div className="mentor-box">
          <img src="https://via.placeholder.com/150" alt="Mentor 3" />
          <h3>Dr. Emily Brown</h3>
          <p>Researcher in Climate Change</p>
        </div>
      </div>
    </div>
  );
};

export default Mentors;

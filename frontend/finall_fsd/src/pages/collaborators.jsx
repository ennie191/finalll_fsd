import React from 'react';


const Collaborators = () => {
  return (
    <div className="collaborators-section">
      <h2>Our Collaborators</h2>
      <div className="collaborators-container">
        <div className="collaborator-box">
          <img src="https://via.placeholder.com/150" alt="Collaborator 1" />
          <h3>Green Solutions Ltd.</h3>
          <p>Partnering for sustainable agriculture projects</p>
        </div>
        <div className="collaborator-box">
          <img src="https://via.placeholder.com/150" alt="Collaborator 2" />
          <h3>Urban Green Initiatives</h3>
          <p>Working together for urban farming initiatives</p>
        </div>
        <div className="collaborator-box">
          <img src="https://via.placeholder.com/150" alt="Collaborator 3" />
          <h3>EcoFuture Foundation</h3>
          <p>Collaborating on climate change awareness campaigns</p>
        </div>
      </div>
    </div>
  );
};

export default Collaborators;

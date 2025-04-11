// src/components/SDGDashboard.jsx
import React from 'react';
import '../styles/sdgDashboard.css';

// SDG data with names and colors
const sdgData = [
  { number: 1, name: 'No Poverty', color: '#E5243B' },
  { number: 2, name: 'Zero Hunger', color: '#DDA63A' },
  { number: 3, name: 'Good Health & Well-being', color: '#4C9F38' },
  { number: 4, name: 'Quality Education', color: '#C5192D' },
  { number: 5, name: 'Gender Equality', color: '#FF3A21' },
  { number: 6, name: 'Clean Water & Sanitation', color: '#26BDE2' },
  { number: 7, name: 'Affordable & Clean Energy', color: '#FCC30B' },
  { number: 8, name: 'Decent Work & Economic Growth', color: '#A21942' },
  { number: 9, name: 'Industry, Innovation & Infrastructure', color: '#FD6925' },
  { number: 10, name: 'Reduced Inequalities', color: '#DD1367' },
  { number: 11, name: 'Sustainable Cities & Communities', color: '#FD9D24' },
  { number: 12, name: 'Responsible Consumption & Production', color: '#BF8B2E' },
  { number: 13, name: 'Climate Action', color: '#3F7E44' },
  { number: 14, name: 'Life Below Water', color: '#0A97D9' },
  { number: 15, name: 'Life on Land', color: '#56C02B' },
  { number: 16, name: 'Peace, Justice & Strong Institutions', color: '#00689D' },
  { number: 17, name: 'Partnerships for the Goals', color: '#19486A' }
];

const SDGDashboard = ({ projects }) => {
  // Count projects by SDG
  const sdgCounts = {};
  sdgData.forEach(sdg => {
    sdgCounts[sdg.number] = 0;
  });

  // Count the projects for each SDG
  projects.forEach(project => {
    project.sdgs.forEach(sdgNumber => {
      sdgCounts[sdgNumber] = (sdgCounts[sdgNumber] || 0) + 1;
    });
  });

  // Find the maximum count to calculate percentages
  const maxCount = Math.max(...Object.values(sdgCounts));

  return (
    <div className="sdg-dashboard">
      <div className="sdg-grid">
        {sdgData.map(sdg => {
          const count = sdgCounts[sdg.number] || 0;
          const percentage = maxCount ? (count / maxCount) * 100 : 0;
          
          return (
            <div 
              key={sdg.number} 
              className="sdg-item"
              style={{ 
                backgroundColor: sdg.color,
                
                color: "white"
              }}
            >
              <div className="sdg-icon">
                {sdg.number}
              </div>
              <div className="sdg-info">
                <div className="sdg-name">{sdg.name}</div>
                <div className="sdg-count">{count} Projects</div>
              </div>
              <div className="sdg-bar-container">
                <div 
                  className="sdg-bar" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sdg-legend">
        <p>Click on any SDG to view associated projects</p>
      </div>
    </div>
  );
};

export default SDGDashboard;

// src/components/SDGDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SDGDashboard = ({ projects = [] }) => {
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

  const countProjectsForSDG = (sdgNumber, projects) => {
    return projects.reduce((count, project) => {
      if (!project.sdgs) return count;

      try {
        let sdgs = project.sdgs;

        if (typeof sdgs === 'string') {
          const cleaned = sdgs.replace(/sdg/gi, '').trim();
          sdgs = cleaned.split(/\s*,\s*/).map(num => parseInt(num, 10));
        }

        if (Array.isArray(sdgs)) {
          return sdgs.includes(sdgNumber) ? count + 1 : count;
        }
      } catch (e) {
        console.warn('Failed to parse SDGs for project:', project);
      }

      return count;
    }, 0);
  };

  const sdgCounts = sdgData.reduce((counts, sdg) => {
    counts[sdg.number] = countProjectsForSDG(sdg.number, projects);
    return counts;
  }, {});

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const sdgRows = chunkArray(sdgData, 4);

  return (
    <div className="my-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">SDG Impact Distribution</h2>
        <p className="text-gray-400">Explore our contributions toward the UN Sustainable Development Goals</p>
      </div>

      {/* SDG Grid */}
      <div className="space-y-4">
        {sdgRows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-4">
            {row.map((sdg) => (
              <Link
                key={sdg.number}
                to={`/sdg/${sdg.number}`}
                className="flex-1 min-w-[200px] max-w-[250px] h-[180px] rounded-lg p-5 hover:shadow-xl transition-all transform hover:scale-105 flex flex-col justify-between"
                style={{ backgroundColor: sdg.color }}
              >
                <div>
                  <div className="text-white font-bold text-2xl">SDG {sdg.number}</div>
                  <div className="text-white text-base mt-2">{sdg.name}</div>
                </div>
                <div className="text-white text-xl font-bold self-end">
                  {sdgCounts[sdg.number] || 0} projects
                </div>
              </Link>
            ))}
            {/* Empty cells for alignment */}
            {row.length < 4 &&
              Array(4 - row.length)
                .fill()
                .map((_, i) => (
                  <div key={`empty-${i}`} className="flex-1 min-w-[200px] max-w-[250px]" />
                ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SDGDashboard;
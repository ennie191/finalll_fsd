import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

const SDGDashboard = ({ projects = [] }) => {
  const sdgData = useMemo(() => [
    { number: 1, name: 'No Poverty', color: '#E5243B', icon: '🚫💰' },
    { number: 2, name: 'Zero Hunger', color: '#DDA63A', icon: '🍽️' },
    { number: 3, name: 'Good Health & Well-being', color: '#4C9F38', icon: '🏥' },
    { number: 4, name: 'Quality Education', color: '#C5192D', icon: '📚' },
    { number: 5, name: 'Gender Equality', color: '#FF3A21', icon: '⚧️' },
    { number: 6, name: 'Clean Water & Sanitation', color: '#26BDE2', icon: '💧' },
    { number: 7, name: 'Affordable & Clean Energy', color: '#FCC30B', icon: '⚡' },
    { number: 8, name: 'Decent Work & Economic Growth', color: '#A21942', icon: '💼' },
    { number: 9, name: 'Industry, Innovation & Infrastructure', color: '#FD6925', icon: '🏗️' },
    { number: 10, name: 'Reduced Inequalities', color: '#DD1367', icon: '⚖️' },
    { number: 11, name: 'Sustainable Cities & Communities', color: '#FD9D24', icon: '🏙️' },
    { number: 12, name: 'Responsible Consumption & Production', color: '#BF8B2E', icon: '🔄' },
    { number: 13, name: 'Climate Action', color: '#3F7E44', icon: '🌍' },
    { number: 14, name: 'Life Below Water', color: '#0A97D9', icon: '🐠' },
    { number: 15, name: 'Life on Land', color: '#56C02B', icon: '🌳' },
    { number: 16, name: 'Peace, Justice & Strong Institutions', color: '#00689D', icon: '🕊️' },
    { number: 17, name: 'Partnerships for the Goals', color: '#19486A', icon: '🤝' }
  ], []);

  const countProjectsForSDG = useMemo(() => {
    return (sdgNumber, projects) => {
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
  }, []);

  const sdgCounts = useMemo(() => {
    return sdgData.reduce((counts, sdg) => {
      counts[sdg.number] = countProjectsForSDG(sdg.number, projects);
      return counts;
    }, {});
  }, [projects, sdgData, countProjectsForSDG]);

  const chunkArray = (array, size) => {
    const result = [];
    for (let i = 0; i < array.length; i += size) {
      result.push(array.slice(i, i + size));
    }
    return result;
  };

  const sdgRows = useMemo(() => chunkArray(sdgData, 4), [sdgData]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-white mb-3 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          SDG Impact Dashboard
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Visualizing our contributions toward the United Nations Sustainable Development Goals
        </p>
      </div>

      {/* SDG Grid */}
      <div className="space-y-6">
        {sdgRows.map((row, rowIndex) => (
          <div key={`row-${rowIndex}`} className="flex flex-wrap justify-center gap-5">
            {row.map((sdg) => (
              <Link
                key={sdg.number}
                to={`/sdg/${sdg.number}`}
                className="flex-1 min-w-[240px] max-w-[280px] h-[200px] rounded-xl p-6 hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] flex flex-col justify-between relative overflow-hidden group"
                style={{ backgroundColor: sdg.color }}
              >
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                </div>
                
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="text-white font-bold text-3xl">SDG {sdg.number}</div>
                      <div className="text-white text-lg mt-2 font-medium">{sdg.name}</div>
                    </div>
                    <span className="text-3xl">{sdg.icon}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-white text-2xl font-bold">
                    {sdgCounts[sdg.number] || 0} project{sdgCounts[sdg.number] !== 1 ? 's' : ''}
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Summary Stats
      <div className="mt-12 bg-gray-800/50 rounded-xl p-6 max-w-4xl mx-auto">
        <h3 className="text-xl font-semibold text-white mb-4"></h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-gray-300 text-sm"></div>
            <div className="text-white text-2xl font-bold">{projects.length}</div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-gray-300 text-sm"></div>
            <div className="text-white text-2xl font-bold">
              {Object.values(sdgCounts).filter(count => count > 0).length}
            </div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-gray-300 text-sm"></div>
            <div className="text-white text-2xl font-bold">
              {Object.entries(sdgCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0] || '-'}
            </div>
          </div>
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="text-gray-300 text-sm"></div>
            <div className="text-white text-2xl font-bold">
              {projects.length > 0 
                ? (Object.values(sdgCounts).reduce((a, b) => a + b, 0) / projects.length).toFixed(1)
                : '0'}
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SDGDashboard;      
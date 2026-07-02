import React, { useState } from 'react';

export default function MetricSplit() {
  const [hoveredSide, setHoveredSide] = useState(null); // 'left' or 'right'

  return (
    <div className="w-full max-w-4xl mx-auto h-48 flex rounded-2xl overflow-hidden border border-gray-800 bg-black mt-20">
      {/* Left Panel */}
      <div 
        onMouseEnter={() => setHoveredSide('left')}
        onMouseLeave={() => setHoveredSide(null)}
        className={`p-8 flex flex-col justify-center items-center transition-all duration-500 cursor-pointer ${
          hoveredSide === 'left' ? 'w-2/3 bg-express-purple text-black' : hoveredSide === 'right' ? 'w-1/3 opacity-40' : 'w-1/2'
        }`}
      >
        <span className="text-sm uppercase tracking-widest font-bold">Registrations</span>
        <span className="text-5xl font-black mt-2">1000+</span>
      </div>

      {/* Right Panel */}
      <div 
        onMouseEnter={() => setHoveredSide('right')}
        onMouseLeave={() => setHoveredSide(null)}
        className={`p-8 flex flex-col justify-center items-center border-l border-gray-800 transition-all duration-500 cursor-pointer ${
          hoveredSide === 'right' ? 'w-2/3 bg-purple-900 text-white' : hoveredSide === 'left' ? 'w-1/3 opacity-40' : 'w-1/2'
        }`}
      >
        <span className="text-sm uppercase tracking-widest font-bold">Audience Footprint</span>
        <span className="text-5xl font-black mt-2">Top Tier</span>
      </div>
    </div>
  );
}
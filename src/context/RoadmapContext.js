import React, { createContext, useState } from 'react';

export const RoadmapContext = createContext();

export const RoadmapProvider = ({ children }) => {
  const [roadmapData, setRoadmapData] = useState(null);

  const updateRoadmapData = (data) => {
    setRoadmapData(data);
  };

  return (
    <RoadmapContext.Provider value={{ roadmapData, updateRoadmapData }}>
      {children}
    </RoadmapContext.Provider>
  );
}; 
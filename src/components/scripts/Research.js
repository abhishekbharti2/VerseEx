import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Research.css';

export default function Research() {
  const [agen, setAgen] = useState(null);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://server-verseex.onrender.com/api/missions")
      .then((response) => response.json())
      .then((item) => {
        setData(item);
        setFilteredData(item);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching missions:", error);
      });
  }, []);

  let agencies = data.filter(
    (item, index, self) =>
      index === self.findIndex((t) => t.agency === item.agency)
  );

  function filterAgency(values) {
    setAgen(values);
    const filtered = data.filter((item) => item.agency.includes(values));
    setFilteredData(filtered);
  }

  function filterMission(values) {
    const filtered = data.filter((item) => item.name.includes(values));
    setFilteredData(filtered);
  }

  return (
    <div className="mission-explorer">
      <div className="mission-header-spacer"></div>
      
      <div className="mission-explorer-container">
        <input type="checkbox" id="mission-filter-toggle" className="filter-toggle-checkbox" />
        
        <label htmlFor="mission-filter-toggle" className="filter-toggle-button">
          <span className="filter-icon">☰</span>
          <span className="filter-text">Filters</span>
        </label>
        
        <div className="mission-filter-panel">
          <div className="filter-content">
            <div 
              className="filter-option all-missions" 
              onClick={() => {
                setFilteredData(data);
                setAgen(null);
              }}
            >
              All Missions
            </div>
            
            <Link to="/addForm" className="filter-option add-new">
              + Add New Mission
            </Link>
            
            {agencies.map((mission) => (
              <div key={mission.id} className="agency-filter-group">
                <div 
                  className="agency-name" 
                  onClick={() => { filterAgency(mission.agency) }}
                >
                  {mission.agency}
                </div>
                
                {mission.agency === agen && (
                  <div className="mission-subfilters">
                    {filteredData.map((ageMis) => (
                      <div 
                        key={ageMis.id} 
                        className="mission-name"
                        onClick={() => { filterMission(ageMis.name) }}
                      >
                        {ageMis.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mission-grid-container">
          <div className="mission-grid-scroll">
            {loading ? (
              <div className="mission-loading-grid">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="mission-card-skeleton"></div>
                ))}
              </div>
            ) : (
              <div className="mission-grid">
                {filteredData.map((mission) => (
                  <div className="mission-card" key={mission.id}>
                    <div className="mission-agency-badge">
                      {mission.agency}
                    </div>
                    
                    <div className="mission-image-container">
                      <img 
                        src={mission.image} 
                        className="mission-image" 
                        alt={mission.name} 
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
                        }}
                      />
                    </div>
                    
                    <div className="mission-content">
                      <Link 
                        className="mission-title" 
                        state={mission} 
                        to={`/Research/${mission.id}`}
                      >
                        {mission.name}
                      </Link>
                      
                      <p className="mission-description">
                        {mission.information}
                      </p>
                      
                      <div className="mission-result">
                        <span className="result-label">Results:</span>
                        <span className="result-text">{mission.result}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
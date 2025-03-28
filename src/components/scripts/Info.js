import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/info.css";

function Info() {
  const location = useLocation();

  return (
    <div className="verseex-details-container">
      <div className="verseex-all-details">
        {
          (
            <div key={location.state.id} className="verseex-detail-data">
              <div className="verseex-det-upper">
                <div className="verseex-det-first">
                  <span className="verseex-agency-badge">{location.state.agency}</span>
                  <h2 className="verseex-mission-title">{location.state.name}</h2>
                  <hr className="verseex-divider" />
                  <div className="verseex-date-container">
                    <h4 className="verseex-date">Start Date: {location.state.start}</h4>
                    <h4 className="verseex-date">End Date: {location.state.end}</h4>
                  </div>
                  <p className="verseex-overview"><strong className="verseex-overview-title">Overview:</strong><br />{location.state.information}</p>
                </div>
                <div className="verseex-det-second">
                  <img src={location.state.image} alt={location.state.name} className="verseex-mission-image" />
                  <h5 className="verseex-image-caption">fig. 1: {location.state.name}</h5>
                </div>
              </div>
              <div className="verseex-det-lower">
                <p className="verseex-details-text">{location.state.details}</p>
                <p className="verseex-result"><strong className="verseex-result-title">Result: </strong>{location.state.result}</p>
              </div>
            </div>
          ) 
        }
      </div>
    </div>
  );
}

export default Info;
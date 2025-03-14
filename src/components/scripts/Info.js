import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/info.css";

function Info() {
  const location = useLocation();

  return (
    <div className="details-container">
      <div className="all-details">
        {
          (
            <div key={location.state.id} className="detail-data">
              <div className="det-upper">
                <div className="det-first">
                  <span>{location.state.agency}</span>
                  <h2>{location.state.name}</h2>
                  <hr />
                  <div>
                    <h4>Start Date: {location.state.start}</h4>
                    <h4>End Date: {location.state.end}</h4>
                  </div>
                  <p><strong style={{ color: "black" }}>Overview:</strong><br />{location.state.information}</p>
                </div>
                <div className="det-second">
                  <img src={location.state.image} alt={location.state.name} />
                  <h5 style={{ color: "black" }}>fig. 1: {location.state.name}</h5>
                </div>
              </div>
              <div className="det-lower">
                <p>{location.state.details}</p>
                <p><strong style={{ color: "green" }}>Result: </strong>{location.state.result}</p>
              </div>
            </div>
          ) 
        }
      </div>
    </div>
  );
}

export default Info;

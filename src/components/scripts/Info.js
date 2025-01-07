import React from "react";
import { useParams } from 'react-router-dom'
import data from '../../DataSet/ResData.json';
import '../styles/info.css';

function Info() {
  let { id } = useParams();
  let showData = data.filter((item) =>
    item.id.includes(id))
  return (
    <div className="details-container">
      <div className="all-details">
        {showData.map((showing) => (
          <div key={showing.id} className="detail-data">
            <div className="det-upper">
              <div className="det-first">
                <span>{showing.agency}</span>
                <h2>{showing.name}</h2>
                <hr />
                <div>
                  <h4>Start Date: {showing.start}</h4>
                  <h4>End Date: {showing.end}</h4>
                </div>
                <p><strong style={{color:'black'}}>Overview:</strong><br />{showing.information}</p>
              </div>
              <div className="det-second">
                <img src={showing.image} alt=" " />
                <h5 style={{color:'black'}}>fig. 1: {showing.name}</h5>
              </div>
            </div>
            <div className="det-lower">
            <p>{showing.details}</p>
            <p><strong style={{color:'green'}}>Result: </strong>{showing.result}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Info;
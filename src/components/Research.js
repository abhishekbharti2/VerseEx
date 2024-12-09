import React from 'react';
import './Research.css';
import data from '../DataSet/ResData.json';

export default function Research() {
  return (
    <div className="research-container">
      <h1 className='just-space'>-</h1>
      <section className="research-sec-1">
        <input type="checkbox" id="filter-checkbox" />
        <label for="filter-checkbox" className="filter-pull-btn">
          &#10093;
        </label>
        <div className="res-filter-bxs">
          {
              data.map((mission) =>(
                <ul key = {mission.id} >
                <li className="filter-label">
                 {mission.agency} : {mission.name}
              </li>
              </ul>
              ))
          }
        </div>
        <div className="res-sub-sec" id="res-all-cards">
          {data.map((mission) => (
            <div className="res-cards" key={mission.id}>
              <img src={mission.image} className="res-card-img" alt="" />
              <a className="res-card-title" href={`https://en.wikipedia.org/wiki/`+ mission.name}>
                {mission.name}
              </a>
              <p className="res-card-info">{mission.information}</p>
              <p className="res-card-info">
                <strong style={{ color: 'green' }}>Results : </strong>
                {mission.result}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

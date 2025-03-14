import React, { useState, useEffect } from 'react';
import '../styles/Research.css';
import { Link } from 'react-router-dom';

export default function Research() {
  const [agen, setAgen] = useState(null)
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://server-verseex.onrender.com/api/missions")
      .then((response) => response.json())
      .then((item) => {
        setData(item);
        setFilteredData(item)
        setLoading(false)
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
    setAgen(values)
    const filtered = data.filter((item) =>
      item.agency.includes(values)
    );
    setFilteredData(filtered);
  }
  function filterMission(values) {
    const filtered = data.filter((item) =>
      item.name.includes(values)
    );
    setFilteredData(filtered);
  }

  return (
    <div className="research-container">
      <h1 className='just-space'>-</h1>
      <section className="research-sec-1">
        <input type="checkbox" id="filter-checkbox" />
        <label htmlFor="filter-checkbox" className="filter-pull-btn">
          &#10093;
        </label>
        <div className="res-filter-bxs">
          <div className='agencies' onClick={() => {
            setFilteredData(data)
            setAgen(null)
          }} style={{ textAlign: 'center' }}>All Missions</div>
          {
            agencies.map((mission) => (
              <div key={mission.id} className='agencies'>
                <h3 onClick={() => { filterAgency(mission.agency) }}>
                  {mission.agency}
                </h3>
                {mission.agency === agen && filteredData.map((ageMis) => (
                  <div key={ageMis.id} onClick={() => { filterMission(ageMis.name) }}>
                    {ageMis.name}
                  </div>
                ))
                }
              </div>
            ))
          }
        </div>
        <div className="res-sub-sec" id="res-all-cards">
          {!loading && filteredData.map((mission) => (
            <div className="res-cards" key={mission.id}>
              <span className='top-of-card'>{mission.agency}</span>
              <img src={mission.image} className="res-card-img" alt=" " />
              <Link className="res-card-title" to={`/Research/${mission.id}`}>
                {mission.name}
              </Link>
              <p className="res-card-info">{mission.information}</p>
              <p className="res-card-info">
                <strong style={{ color: 'green' }}>Results : </strong>
                {mission.result}
              </p>
            </div>
          ))}
          {loading &&
            [...Array(8)].map((_, index) => (
              <div key={index} className={`loader-res`}></div>
            ))
          }
        </div>
      </section>
    </div>
  );
}
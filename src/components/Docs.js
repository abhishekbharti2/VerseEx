import React, { useState, useEffect } from 'react';
import data from '../DataSet/Objects.json';
import './Docs.css';

export default function Docs() {
  const [infotitle, setTitle] = useState(data[0].name);
  const [bgimage, setimage] = useState(data[0].image_link);
  const [info, setinfo] = useState(data[0].information);
  const [idnumber, setid] = useState(data[0].id);
  const [loading, setLoading] = useState(true);

  function speakNow() {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(info);
    msg.lang = 'hi-IN';
    speechSynthesis.speak(msg);
  }

  useEffect(() => {
    document.getElementById('main-image').addEventListener('load', () => {
      console.log('Image Loaded');
      setLoading(false);
    })
  }, []);

  function changeNext() {
    data.forEach((element) => {
      if (element.id === idnumber + 1) {
        setTitle(element.name);
        setinfo(element.information);
        setimage(element.image_link);
        setid(element.id);
        setLoading(true);
        return;
      }
    })
  }
  function changePrev() {
    data.forEach((element) => {
      if (element.id === idnumber - 1) {
        setTitle(element.name);
        setinfo(element.information);
        setimage(element.image_link);
        setid(element.id);
        setLoading(true);
        return;
      }
    });
  }

  return (
    <div className="doc-container">
      <div className='starConainer'>
        <div class="starsec"></div>
        <div class="starthird"></div>
        <div class="starfourth"></div>
        <div class="starfifth"></div>
      </div>
      <div className="info-container">
        <div className="info-left">
          <h3 className="info-heading">{infotitle} Overview</h3>
          <p className="info-paragraph">
            {info}
            <div>
              <a className='head-button learn-more' href={`https://en.wikipedia.org/wiki/${infotitle}`} 
              target='_blank' rel='noreferrer' onClick={()=>{alert("You're redirecting to Wikipedia")}} >Learn More</a>
              <button className='explore-btn learn-more' onClick={speakNow}>&#128266;</button>
            </div>
          </p>
        </div>
        <div className="info-right">
          <img src={bgimage} className="topic-image" alt="this is topic" id='main-image' />
          
          {
            loading && <div id="spinner">
              <span></span>
              Loading Image
            </div>
          }
          <div className="next-prev">
            <button onClick={changePrev}>&#10094; Prev</button>
            <span>{idnumber}</span>
            <button onClick={changeNext} >Next &#10095;</button>
          </div>
        </div>
      </div>
      <span className="water-mark">Outer Space Celestial Objects</span>
    </div>
  );
}

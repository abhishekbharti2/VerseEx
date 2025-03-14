import React, { useState, useEffect } from 'react';
import '../styles/Objects.css';

export default function Docs() {
  const [data, setData] = useState([{
    "id": "1", "name": "Loading data[index]...", "information": "", "image_link": "logo.png"
  }])
  const [slide, setSlide] = useState(0)
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch("https://server-verseex.onrender.com/api/objects");
        if (!response.ok) throw new Error("Failed to fetch missions");
        const item = await response.json();
        setData(item)

      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };
    fetchMissions();
  }, [index]);

  function speakNow() {
    speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(data[index].information);
    msg.lang = 'hi-IN';
    speechSynthesis.speak(msg);
  }

  useEffect(() => {
    const change = setInterval(() => {
      let v = (slide + 1) % data.length
      if (data[v]) {
        setSlide(v)
      }
    }, 4000);

    document.getElementById('main-image').addEventListener('load', () => {
      console.log('Image Loaded');
      setLoading(false);
    })

    return () => { clearInterval(change) }
  }, [data.image, data, slide]);

  function changeNext() {
    let v = index + 1
    if (data[v]) {
      setIndex(v)
      setLoading(true)
    }
  }

  function changePrev() {
    let v = index - 1
    if (data[v]) {
      setIndex(v)
      setLoading(true)
    }
  }

  return (
    <div className="doc-container">
      <div className="slideshow-container">
        <div className="mySlides">
          <img src={data[slide].image_link} alt=' ' id='topbgimage' />
          <div className="objecttitle">{data[slide].name}</div>
        </div>
        <div className='objectdots'>
          {data.map((item) => (<span key={item.id} className={`objdot ${item.id === data[slide].id ? "currentIn" : ""}`}></span>))}
        </div>
      </div>
      <div className="info-container">
        <div className="info-left">
          <h3 className="info-heading">{data[index].name} Overview</h3>
          <p className="info-paragraph">
            {data[index].information}
            <div>
              <a className='head-button learn-more' href={`https://en.wikipedia.org/wiki/${data[index].name}`}
                target='_blank' rel='noreferrer' onClick={() => { alert("You're redirecting to Wikipedia") }} >Learn More</a>
              <button className='explore-btn learn-more' onClick={speakNow}>&#128266;</button>
            </div>
          </p>
        </div>
        <div className="info-right">
          <img src={data[index].image_link} className="topic-image" alt="this is topic" id='main-image' />

          {
            loading && <div id="spinner">
              <span className='loader-doc'></span>
              Loading Image
            </div>
          }
          <div className="next-prev">
            <button onClick={changePrev}>&#10094; Prev</button>
            <span>{data[index].id}</span>
            <button onClick={changeNext} >Next &#10095;</button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import '../styles/Objects.css';

export default function Docs() {
  const [data, setData] = useState([{
    "id": "1", "name": "Loading data...", "information": "", "image_link": "logo.png"
  }]);
  const [slide, setSlide] = useState(0);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch("https://server-verseex.onrender.com/api/objects");
        if (!response.ok) throw new Error("Failed to fetch missions");
        const item = await response.json();
        setData(item);
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
      let v = (slide + 1) % data.length;
      if (data[v]) {
        setSlide(v);
      }
    }, 4000);

    document.getElementById('main-image')?.addEventListener('load', () => {
      setLoading(false);
    });

    return () => { clearInterval(change); }
  }, [data, slide]);

  function changeNext() {
    let v = index + 1;
    if (data[v]) {
      setIndex(v);
      setLoading(true);
    }
  }

  function changePrev() {
    let v = index - 1;
    if (data[v]) {
      setIndex(v);
      setLoading(true);
    }
  }

  return (
    <div className="cosmic-explorer">
      {/* Hero Slideshow */}
      <div className="cosmic-hero">
        <div className="hero-slide">
          <img 
            src={data[slide]?.image_link} 
            alt={data[slide]?.name} 
            className="hero-image" 
          />
          <div className="hero-overlay">
            <h1 className="hero-title">{data[slide]?.name}</h1>
          </div>
        </div>
        
        <div className="slide-indicators">
          {data.map((item) => (
            <span 
              key={item.id} 
              className={`slide-dot ${item.id === data[slide]?.id ? "active" : ""}`}
            ></span>
          ))}
        </div>
      </div>

      {/* Content Section */}
      <div className="cosmic-content">
        <div className="content-info">
          <h2 className="content-title">
            {data[index]?.name} <span className="highlight">Overview</span>
          </h2>
          <div className="content-description">
            <p>{data[index]?.information}</p>
            <div className="content-actions">
              <a 
                className="action-button learn-more" 
                href={`https://en.wikipedia.org/wiki/${data[index]?.name}`}
                target='_blank' 
                rel='noreferrer'
              >
                Explore on Wikipedia
              </a>
              <button 
                className="action-button audio-button" 
                onClick={speakNow}
                aria-label="Listen to description"
              >
                🔊 Listen
              </button>
            </div>
          </div>
        </div>
        
        <div className="content-media">
          <div className="media-container">
            {loading && (
              <div className="media-loader">
                <div className="cosmic-spinner"></div>
                <span>Loading Cosmic Image...</span>
              </div>
            )}
            <img 
              src={data[index]?.image_link} 
              alt={data[index]?.name} 
              className="detail-image"
              id="main-image"
              onLoad={() => setLoading(false)}
            />
          </div>
          
          <div className="media-navigation">
            <button 
              className="nav-button prev-button" 
              onClick={changePrev}
              disabled={index === 0}
            >
              ← Previous
            </button>
            <span className="nav-counter">
              {data[index]?.id} / {data.length}
            </span>
            <button 
              className="nav-button next-button" 
              onClick={changeNext}
              disabled={index === data.length - 1}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
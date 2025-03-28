import React, { useState } from 'react';
import '../styles/Search.css';

export default function Search(props) {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const getDataNow = async () => {
    let res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${props.getData}`)
    if (res.ok) {
      let data = await res.json();
      setResult(data);
      setError(null);
    } else {
      setError("Couldn't get the Data");
      setResult(null);
    }
  }

  if (props.getData) {
    getDataNow();
    props.setData(null);
  }

  return (
    <div className="search-results-container">
      {(error || !result) ? (
        <div className="search-error-state">
          <div className="error-content">
            <h1 className="error-code">404</h1>
            <p className="error-message">
              Cosmic anomaly detected! The knowledge you seek is not in our star charts.
            </p>
            <a href="/" className="error-return-link">
              Return to Home Base
            </a>
          </div>
        </div>
      ) : (
        <div className="search-result-card">
          <div className="result-header">
            <h2 className="result-title">{result.title}</h2>
            {result.thumbnail && (
              <img
                src={result.thumbnail.source}
                alt={result.title}
                className="result-image"
              />
            )}
          </div>
          <div className="result-content">
            <p className="result-summary">{result.extract}</p>
            <div className="result-actions">
              <a
                href={result.content_urls.desktop.page}
                target="_blank"
                rel="noreferrer"
                className="read-more-btn"
              >
                Explore Deeper
                <span className="icon-arrow">→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
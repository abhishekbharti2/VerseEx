import DummyData from '../../DataSet/DocsData.json'
import React, { useState } from 'react';
import '../styles/Search.css';
import './Navbar.js'

export default function Search(props) {

  const [result, setResult] = useState(DummyData);
  const [error, setError] = useState(null);

  const getDataNow = async () => {
    console.log(props.getData)
    let res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${props.getData}`)
    if (res.ok) {
      let data = await res.json();
      setResult(data);
      setError(null)
    }
    else {
      setError("Couldn't get the Data");
      setResult(null);
    }
  }
  if (props.getData) {
    getDataNow();
    props.setData(null);
  }
  return (
    <div className="search-container">
      {error &&
        <div class="error-container">
        <h1> 404 </h1>
        <p>
            Oops! The page you're
            looking for is not here.
        </p>
        <a href="/">
            Go Back
        </a>
    </div>
      }

      {result && (
        <div className="item-container">
          <h3 className="search-title">{result.title}</h3>
          {result.thumbnail && (
            <img
              src={result.thumbnail.source}
              alt={result.title}
              className="search-img"
            />
          )}
          <p className="search-info">{result.extract}</p>
          <a
            href={result.content_urls.desktop.page}
            target="_blank"
            rel="noreferrer"
            className="read-more"
          >
            Read more
          </a>
        </div>
      )}
    </div>
  );
}

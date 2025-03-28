import React, { useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar(props) {
 const [val, setVal] = useState(null);
  useEffect(() => {
    const navbarlink = document.querySelectorAll('.navbar-link');
    const loading = document.getElementById('loading-page');
    navbarlink.forEach((gotosrc) => {
      gotosrc.addEventListener('click', () => {
        loading.style.display = 'flex';
        setTimeout(() => {
          loading.style.display = 'none';
        }, 1000);
      });
    });
    return () => {
      navbarlink.forEach((gotosrc) => {
        gotosrc.removeEventListener('click', () => {});
      });
    };
  }, []);

  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 5) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <nav className={`nav-container ${scrolled ? "scrolled": ""}`}>
        <input type="checkbox" id="checkbox-1" className="check-boxes" />

        <div className="site-title">
          <h1>
            Verse <span>Ex</span>
          </h1>
          <p>Explore the Universe</p>
        </div>
        <ul className="link-container">
          <li>
            <NavLink to="/" className="navbar-link" >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/objects" className="navbar-link">
              Space
            </NavLink>
          </li>
          <li>
            <NavLink to="/research" className="navbar-link">
              Research
            </NavLink>
          </li>
           <li>
              <NavLink to="/chatex" className="navbar-link">
              ChatEx
              </NavLink>
           </li>
          <li>
            <NavLink to="/quizzes" className="navbar-link">
              Quizzes
            </NavLink>
          </li>
          <li>
            <NavLink to='/game' className="navbar-link">
              Play Game
            </NavLink>
          </li>
          <form className="search-cont" onSubmit={(ev) => {ev.preventDefault()}}>
            <input
              type="text"
              onChange={(eve) =>{setVal(eve.target.value)}}
              placeholder='Search'/>
            <NavLink to='/search'  className = 'navbar-link' id='search-btn' >
              <button className="fa fa-search" type='submit' style = {{color: 'white', cursor:'pointer'}} 
              onClick={() =>{props.setData(val)
                document.getElementById('checkbox-1').checked = false
              }} ></button>
            </NavLink>
          </form>
        </ul> 

        <label htmlFor="checkbox-1" className="label-check" id="label-btn-1">
          &#9776;
        </label>
        <label htmlFor="checkbox-1" className="label-check" id="label-btn-2">
          &#10005;
        </label>
      </nav>
      <div id="loading-page">
        <i className="fa fa-rocket" id="rocket-icon"></i>
        <div className="rocket-tail"></div>
        <span className="loading-title">Let's Fly</span>
        <div className="spinner-loading"></div>
      </div>
    </>
  );
}
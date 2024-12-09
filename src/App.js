import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import Docs from './components/Docs.js';
import Footer from './components/Footer.js';
import ContactUs from './components/ContactUs.js';
import Research from './components/Research.js';
import Search from './components/Search.js';
import Career from './components/Career.js'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

  const [getData, setData] = useState(null);

  return (
    <Router>
      <Navbar setData = {setData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Objects"
          element={<Docs/>}
        />
        <Route path="/Research" element={<Research />} />
        <Route path="/askus" element={<ContactUs />} />
        <Route path="/Career" element={<Career/>} />
        <Route path="/search" element={<Search getData = {getData} setData ={setData} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

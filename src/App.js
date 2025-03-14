import './App.css';
import React, { useState } from 'react';
import Navbar from './components/scripts/Navbar.js';
import Home from './components/scripts/Home.js';
import Docs from './components/scripts/Docs.js';
import Footer from './components/scripts/Footer.js';
import ContactUs from './components/scripts/ContactUs.js';
import Research from './components/scripts/Research.js';
import Search from './components/scripts/Search.js';
import Career from './components/scripts/Career.js';
import Info from './components/scripts/Info.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

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
        <Route path="/Research" element={<Research/>} />
        <Route path="/askus" element={<ContactUs />} />
        <Route path="/Career" element={<Career/>} />
        <Route path="/search" element={<Search getData = {getData} setData ={setData} />} />
        <Route path="/Research/:id" element={<Info/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

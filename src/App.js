import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/scripts/Navbar.js';
import Home from './components/scripts/Home.js';
import Docs from './components/scripts/Docs.js';
import Footer from './components/scripts/Footer.js';
import Quizz from './components/scripts/Quizz.js';
import Research from './components/scripts/Research.js';
import Search from './components/scripts/Search.js';
import Career from './components/scripts/Career.js';
import Info from './components/scripts/Info.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        const response = await fetch("https://server-verseex.onrender.com/api");
        if (!response.ok) throw new Error("Failed to fetch missions");
        await response.json();
      } catch (error) {
        console.error("Error fetching missions:", error);
      }
    };
    fetchMissions();
  }, []);

  const [getData, setData] = useState(null);

  return (
    <Router>
      <Navbar setData={setData} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/objects" element={<Docs />}/>
        <Route path="/research" element={<Research />} />
        <Route path="/quizzes" element={<Quizz />} />
        <Route path="/chatbot" element={<Career />} />
        <Route path="/search" element={<Search getData={getData} setData={setData} />} />
        <Route path="/research/:id" element={<Info />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

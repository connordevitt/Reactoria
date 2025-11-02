import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/navbar';
import LeagueStandings from './pages/leaguestandings';
import Teampage from './pages/Teampage';
import Landing from './pages/landing'; 
import LazyLoadSpinner from './components/lazyload'; 
import React, { Suspense } from 'react';

function App() {
  return (
    <Router basename="/Reactoria">
      <div className="App">
        <NavBar />
        <Suspense fallback={<LazyLoadSpinner />}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/leaguestandings" element={<LeagueStandings />} />
            <Route path="/about" element={<About />} />
            <Route path="/team/:teamId" element={<Teampage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

// Example About component (optional)
const About = () => (
  <div className="container text-center mt-5">
    <h1 className="text-white">About Reacttoria</h1>
    <p className="lead text-white">
      Reacttoria is a modern MLB stats app built with React and Bootstrap.
    </p>
  </div>
);

export default App;
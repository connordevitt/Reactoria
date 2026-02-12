// Revert to simple version to debug step by step
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/navbar';
import Landing from './pages/landing'; 
import LeagueStandings from './pages/leaguestandings';
import Teampage from './pages/Teampage';
import React, { Suspense } from 'react';

function App() {
  return (
    <Router basename="/Reactoria">
      <div className="min-h-screen bg-dark-900">
        <NavBar />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/leaguestandings" element={<LeagueStandings />} />
            <Route path="/team/:teamId" element={<Teampage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
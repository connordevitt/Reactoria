import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import LeagueStandings from './pages/leaguestandings';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/leaguestandings" element={<LeagueStandings />} />
        </Routes>
      </div>
    </Router>
  );
}

// Example Home component
const Home = () => {
  const navigate = useNavigate(); 

  return (
    <div>
      <header className="App-header mt-5">
        <h1 className="App-title">Welcome to Reacttoria!</h1>
        <p className="lead text-white">
          This is a simple React app with Bootstrap styling.
        </p>
      </header>
      <div className="container-sm border bg-dark text-white rounded-3 shadow-sm w-50 mx-auto">
        <div className="row">
          <div className="col-12">
            <h4>Where all MLB Stats are located!</h4>
          </div>
        </div>
        <div className="card-body">
          <p>Reacttoria is a MLB Baseball Stat App!</p>
          <Button
            variant="primary"
            onClick={() => navigate('/leaguestandings')} 
          >
            Go Yankees! Head to the standings page now!
          </Button>
        </div>
      </div>
    </div>
  );
};

export default App;
//Teampage.jsx display a team dynamically to show team data. 

import React, { use } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";

const Teampage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 7);
  
  const fmt = (d) => d.toISOString().slice(0, 10);
  
    useEffect(() => {
    const fetchTeamData = async () => {
        // console.log('TeamID from params:', teamId);
        
        if (!teamId) {
            console.error("No team ID found. Undefined was added");
            setError("No team ID found");
            setLoading(false);
            return;
        }
      try {
        const response = await fetch(
          `https://statsapi.mlb.com/api/v1/teams/${teamId}`
        );
        if (!response.ok) {
          throw new Error("Team not found");
        }
        const data = await response.json();
        if (!data.teams?.[0]) {
            throw new Error("Team data is not available");
          }
        setTeam(data.teams[0]);
        setLoading(false);
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };
    fetchTeamData();
    }, [teamId]);
   



    useEffect(() => {
      if (!teamId) return;

      const fetchRecentGames = async () => {
        try {
          const url = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&teamId=${teamId}&startDate=${fmt(start)}&endDate=${fmt(end)}&hydrate=lineup,decisions`;
          // console.log('Fetching games with URL:', url);
          
          const resp = await fetch(url);
          if (!resp.ok) {
            throw new Error(`Failed to fetch games: ${resp.status}`);
          }
          
          const json = await resp.json();
          // console.log('Full API Response:', JSON.stringify(json, null, 2));
          
          if (!json.dates) {
            throw new Error('No dates data in response');
          }
          
          // Log the first game's structure if available
          // if (json.dates[0]?.games?.[0]) {
          //   console.log('Sample Game Structure:', JSON.stringify(json.dates[0].games[0], null, 2));
          // }
          
          const games = json.dates.flatMap(d => d.games || []);
          setRecentGames(games);
        } catch (error) {
          console.error('Error fetching recent games:', error);
          setError(error.message);
        }
      };
      fetchRecentGames();
    }, [teamId, start, end]);


    if (loading) return <div className="text-white text-center">Loading...</div>;
    if (error) return <div className="text-white text-center">Error: {error}</div>;
    if (!team) return <div className="text-white text-center">No team data available</div>;
    
    return (
      <div className="bg-dark text-white min-vh-100">
        <div className="container py-5 mt-5">
          <div
            className="card bg-secondary text-white shadow-lg mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <div className="card-header text-center bg-dark border-0">
              <Button variant="outline-light" href="/Reactoria/leaguestandings">
                Back to Standings
              </Button>
            </div>
            <div className="card-body p-4">
              {/* Team Logo Placeholder */}
              <div className="d-flex flex-column align-items-center mb-3">
                <div style={{
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: '#23272b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  marginBottom: 16
                }}>
                  <img src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`} alt={team.name}
                    style={{ width: 60, height: 60, objectFit: 'contain', opacity: 0.85 }}
                    />
                </div>
                <h1 className="text-center mb-2 fw-bold" style={{ fontSize: '2.5rem', letterSpacing: 1 }}>{team.name}</h1>
                <div className="mb-3">
                  <span className="badge bg-primary me-2" style={{ fontSize: '1rem' }}>{team.league?.name || 'N/A'}</span>
                  <span className="badge bg-info text-dark" style={{ fontSize: '1rem' }}>{team.division?.name || 'N/A'}</span>
                </div>
              </div>
              <div className="row justify-content-center g-4">
                <div className="col-12 mb-4">
                  <h6 className="border-bottom pb-2 mb-3 fw-semibold fs-6">Team Info</h6>
                  <ul className="list-unstyled ps-2">
                    <li className="mb-2">Venue: {team.venue?.name || "N/A"}</li>
                    <li className="mb-2">Location: {team.locationName || "N/A"}</li>
                    <li className="mb-2">First Year: {team.firstYearOfPlay || "N/A"}</li>
                  </ul>
                </div>
                <div className="col-12">
                  <h2 className="border-bottom pb-2 mb-3 fw-semibold">Recent Games</h2>
                  <ul className="list-unstyled" style={{borderRadius: 12, padding: 16 }}>
                    {recentGames.length === 0 && (
                      <li className="mb-2 text-muted">No recent games found.</li>
                    )}
                    {recentGames.map((game) => (
                      <li key={game.gamePk} className="mb-2">
                        <span className="fw-bold">{game.teams?.home?.team?.name || 'TBD'}</span> vs. <span className="fw-bold">{game.teams?.away?.team?.name || 'TBD'}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Teampage;
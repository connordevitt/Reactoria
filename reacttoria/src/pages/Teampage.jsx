//Teampage.jsx display a team dynamically to show team data. 

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Tabs, Tab } from "react-bootstrap";

const Teampage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roster, setRoster] = useState([]);
  const [rosterLoading, setRosterLoading] = useState(false);
  const [rosterError, setRosterError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const handlePlayerClick = async (playerId) => {
    setSelectedPlayer(playerId);
    setStatsLoading(true);
    setStatsError(null);
    setPlayerStats(null);
    setIsModalOpen(true);
    try {
      const year = new Date().getFullYear();
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=${year}`
      );
      if (!response.ok) throw new Error('Failed to fetch player stats');
      const data = await response.json();
      setPlayerStats(data.stats?.[0] || null);
    } catch (err) {
      setStatsError(err.message);
    } finally {
      setStatsLoading(false);
    }
  };


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

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);

    const fmt = (d) => d.toISOString().slice(0, 10);

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
  }, [teamId]);


  useEffect(() => {
    if(!teamId) return
    setRoster([]);
    setRosterLoading(true);
    setRosterError(null);

    fetch(`https://statsapi.mlb.com/api/v1/teams/${teamId}/roster`)
    .then(res => {
      if(!res.ok) throw new Error("Failed to get the roster");
      return res.json();
    })
    .then(data => {
      setRoster(data.roster || []);
      setRosterLoading(false);
      
    });
  }, [teamId]);


  useEffect(() => {
    if (playerStats) {
      console.log('Player Stats:', playerStats);
    }
  }, [playerStats]);


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
            <Tabs defaultActiveKey="overview" id="team-tabs" className="mb-3">
              <Tab eventKey="overview" title="Overview">
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
                    <ul
                      className="list-unstyled"
                      style={{
                        borderRadius: 12,
                        padding: 16,
                      }}
                    >
                      {recentGames.length === 0 && (
                        <li className="mb-2 text-muted">No recent games found.</li>
                      )}
                      {recentGames.slice(0, 5).map((game) => (
                        <li key={game.gamePk} className="mb-2">
                          <span className="fw-bold">{game.teams?.home?.team?.name || 'TBD'}</span> vs. <span className="fw-bold">{game.teams?.away?.team?.name || 'TBD'}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Tab>
              <Tab eventKey="roster" title="Roster">
                {rosterLoading && (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 text-muted">Loading roster...</p>
                  </div>
                )}
                {rosterError && (
                  <div className="alert alert-danger" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    Error: {rosterError}
                  </div>
                )}
                {roster.length === 0 && !rosterLoading && !rosterError && (
                  <div className="text-center py-4">
                    <i className="fas fa-users fa-3x text-muted mb-3"></i>
                    <p className="text-muted">No roster data found.</p>
                  </div>
                )}
                {roster.length > 0 && (
                  <div>
                    {/* Position Groups */}
                    {(() => {
                      const positionGroups = {};
                      roster.forEach(player => {
                        const position = player.position.name;
                        if (!positionGroups[position]) {
                          positionGroups[position] = [];
                        }
                        positionGroups[position].push(player);
                      });
                      
                      // Sort positions in a logical order
                      const positionOrder = [
                        'Pitcher', 'Starting Pitcher', 'Relief Pitcher', 'Catcher', 
                        'First Baseman', 'Second Baseman', 'Third Baseman', 'Shortstop',
                        'Left Fielder', 'Center Fielder', 'Right Fielder', 'Designated Hitter'
                      ];
                      
                      const sortedPositions = Object.keys(positionGroups).sort((a, b) => {
                        const aIndex = positionOrder.indexOf(a);
                        const bIndex = positionOrder.indexOf(b);
                        if (aIndex === -1 && bIndex === -1) return a.localeCompare(b);
                        if (aIndex === -1) return 1;
                        if (bIndex === -1) return -1;
                        return aIndex - bIndex;
                      });
                      
                      return sortedPositions.map(position => (
                        <div key={position} className="mb-4">
                          <h5 className="border-bottom pb-2 mb-3 fw-semibold text-primary">
                            <i className="fas fa-user me-2"></i>
                            {position}s ({positionGroups[position].length})
                          </h5>
                          <div className="row g-2">
                            {positionGroups[position]
                              .sort((a, b) => {
                                // Sort by jersey number if available, otherwise by name
                                const aNum = parseInt(a.jerseyNumber) || 999;
                                const bNum = parseInt(b.jerseyNumber) || 999;
                                if (aNum !== bNum) return aNum - bNum;
                                return a.person.fullName.localeCompare(b.person.fullName);
                              })
                              .map(player => (
                                <div key={player.person.id} className="col-md-6 col-lg-4">
                                  <div className="card bg-dark border-secondary mb-2">
                                    <div className="card-body p-3">
                                      <div className="d-flex align-items-center">
                                        <div className="flex-shrink-0 me-3">
                                          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" 
                                               style={{ width: '40px', height: '40px', minWidth: '40px' }}>
                                            <span className="fw-bold text-white" style={{ fontSize: '0.9rem' }}>
                                              {player.jerseyNumber || 'N/A'}
                                            </span>
                                          </div>
                                        </div>
                                        <div className="flex-grow-1">
                                          <h6 className="mb-1 fw-semibold" style={{ fontSize: '0.95rem', cursor: 'pointer', color: '#4fc3f7', textDecoration: 'underline' }}
                                            onClick={() => handlePlayerClick(player.person.id)}
                                          >
                                            {player.person.fullName}
                                          </h6>
                                          <small className="text-white">
                                            {player.position.name}
                                          </small>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                )}
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
      {/* Player Stats Modal */}
      {isModalOpen && (
        <div className="modal-overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'auto' }}>
          <div className="modal-content" style={{ position: 'relative', backgroundColor: '#333', padding: '20px', borderRadius: '8px', maxWidth: '60%', maxHeight: '80vh', overflowY: 'auto', color: '#fff' }}>
            <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', top: '10px', right: '10px', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#fff' }}>&times;</button>
            <h4>Player Stats</h4>
            {statsLoading && <div>Loading player stats...</div>}
            {statsError && <div className="alert alert-danger">Error: {statsError}</div>}
            {playerStats && playerStats.splits && playerStats.splits.length > 0 ? (
              <div>
                <h6>Season: {playerStats.splits[0].season}</h6>
                <ul className="list-group list-group-flush">
                  {Object.entries(playerStats.splits[0].stat).map(([key, value]) => (
                    <li key={key} className="list-group-item d-flex justify-content-between align-items-center" style={{ backgroundColor: '#444', color: '#fff' }}>
                      <span style={{ textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span className="fw-bold">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : !statsLoading && !statsError ? (
              <div>No stats available for this player.</div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default Teampage;
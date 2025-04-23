// standings.jsx 
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const Standings = () => {
  const [alStandings, setALStandings] = useState([]);
  const [nlStandings, setNLStandings] = useState([]);


  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          "https://statsapi.mlb.com/api/v1/standings?leagueId=103" ,// 103 is the league ID for AL. We need to also use 104 for NL and display it in a different table/div/card.
        );
        setALStandings(response.data.records);

        const nlResponse  = await axios.get(
          "https://statsapi.mlb.com/api/v1/standings?leagueId=104" // 104 is the league ID for NLd
        ) ;
        setNLStandings(nlResponse.data.records);
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    };

    fetchStandings();
  }, []);

  // Function to find the best records in each league and sort them. 
  const sortLeagueStandings = (standings) => {
    return standings.flatMap((division) => [...division.teamRecords])
      .sort((a, b) => parseFloat(b.winningPercentage) - parseFloat(a.winningPercentage));
  };


  

  const renderTable = (standings) => {
    const sortedStandings = sortLeagueStandings(standings);
    console.log("Sorted Standings:", sortedStandings);
  
    if (!sortedStandings || sortedStandings.length === 0) {
      return <p className="text-center text-white">No standings data available.</p>;
    }
  
    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Team</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Win Percentage</th>
            <th>GB</th>
          </tr>
        </thead>
        <tbody>
          {sortedStandings.map((record, index) => (
            <tr key={index}>
              <td>{record.team?.name || "N/A"}</td>
              <td>{record.wins || "N/A"}</td>
              <td>{record.losses || "N/A"}</td>
              <td>{record.winningPercentage || "N/A"}</td>
              <td>{record.gamesBack || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };
  


  return (
    <div className="standings-container">
      <h2 className="text-center mb-4 text-white">MLB 2025 Standings</h2>

      {/* AL Standings */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h3 className="text-center text-white">American League (AL)</h3>
          {renderTable(alStandings)}
        </div>
      </div>

      {/* NL Standings */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="text-center text-white">National League (NL)</h3>
          {renderTable(nlStandings)}
        </div>
      </div>
    </div>
  );
};

export default Standings;
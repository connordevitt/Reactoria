// standings.jsx 
import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";

const Standings = () => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          "https://statsapi.mlb.com/api/v1/standings?leagueId=103"
        );
        console.log("Standings data:", response.data.records); 
        setStandings(response.data.records);
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    };

    fetchStandings();
  }, []);

  return (
    <div className="standings-container">
      <h2 className="text-center mb-4 text-white">MLB 2025 Standings </h2>
      <div className="card shadow-sm">
        <div className="card-body">
          <Table stripped bordered hover responsive>
            <thead>
              <tr>
                <th>Team</th>
                <th>Wins</th>
                <th>Losses</th>
                <th>Win Percentage</th>
              </tr>
            </thead>
            <tbody>
              {standings.length > 0 ? (
                standings.map((division, divisionIndex) =>
                  division.teamRecords.map((record, teamIndex) => (
                    <tr key={`${divisionIndex}-${teamIndex}`}>
                      <td>{record.team?.name || "N/A"}</td>
                      <td>{record.wins || "N/A"}</td>
                      <td>{record.losses || "N/A"}</td>
                      <td>{record.winningPercentage || "N/A"}</td>
                    </tr>
                  ))
                )
              ) : (
                <tr>
                  <td colSpan="4">No data available</td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Standings;

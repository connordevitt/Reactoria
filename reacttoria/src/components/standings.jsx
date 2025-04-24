import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";

const Standings = () => {
  const [alStandings, setALStandings] = useState([]);
  const [nlStandings, setNLStandings] = useState([]);
  const [view, setView] = useState("League"); // Track the selected view: "League" or "Division"

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const response = await axios.get(
          "https://statsapi.mlb.com/api/v1/standings?leagueId=103"
        );
        setALStandings(response.data.records);

        const nlResponse = await axios.get(
          "https://statsapi.mlb.com/api/v1/standings?leagueId=104"
        );
        setNLStandings(nlResponse.data.records);
      } catch (error) {
        console.error("Error fetching standings:", error);
      }
    };

    fetchStandings();
  }, []);

  const sortLeagueStandings = (standings) => {
    return standings.flatMap((division) => [...division.teamRecords])
      .sort((a, b) => parseFloat(b.winningPercentage) - parseFloat(a.winningPercentage));
  };

  const getDivisionStandings = (standings, divisionName) => {
    return standings.flatMap((division) =>
      division.teamRecords.filter((record) => record.division?.name === divisionName)
    );
  };

  const renderLeagueTable = (standings) => {
    const sortedStandings = sortLeagueStandings(standings);

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

  const renderDivisionStandings = (divisionName, standings) => {
    const divisionStandings = getDivisionStandings(standings, divisionName);

    if (!divisionStandings || divisionStandings.length === 0) {
      return <p className="text-center text-white">No standings data available for {divisionName}.</p>;
    }

    return (
      <div>
        <h4 className="text-center text-white">{divisionName}</h4>
        {renderLeagueTable(divisionStandings)}
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-center text-white">MLB 2025 Standings</h2>

      {/* Dropdown to switch views */}
      <Dropdown className="mb-4 text-center">
        <Dropdown.Toggle variant="dark" id="dropdown-basic">
          {view === "League" ? "League Standings" : "Division Standings"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setView("League")}>League Standings</Dropdown.Item>
          <Dropdown.Item onClick={() => setView("Division")}>Division Standings</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* Conditionally render standings */}
      {view === "League" ? (
        <>
          {/* League Standings */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h3 className="text-center text-white">American League (AL)</h3>
              {renderLeagueTable(alStandings)}
            </div>
          </div>
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center text-white">National League (NL)</h3>
              {renderLeagueTable(nlStandings)}
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Division Standings */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              {renderDivisionStandings("AL Central", alStandings)}
              {renderDivisionStandings("AL East", alStandings)}
              {renderDivisionStandings("AL West", alStandings)}
              {renderDivisionStandings("NL Central", nlStandings)}
              {renderDivisionStandings("NL East", nlStandings)}
              {renderDivisionStandings("NL West", nlStandings)}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Standings;
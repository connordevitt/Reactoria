import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Dropdown from "react-bootstrap/Dropdown";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const teamURLS = {
  "New York Yankees": "https://www.mlb.com/yankees/",
  "Boston Red Sox": "https://www.mlb.com/redsox/",
  "Tampa Bay Rays": "https://www.mlb.com/rays/",
  "Toronto Blue Jays": "https://www.mlb.com/bluejays/",
  "Baltimore Orioles": "https://www.mlb.com/orioles/",
  "Cleveland Guardians": "https://www.mlb.com/guardians/",
  "Detroit Tigers": "https://www.mlb.com/tigers/",
  "Kansas City Royals": "https://www.mlb.com/royals/",
  "Minnesota Twins": "https://www.mlb.com/twins/",
  "Chicago White Sox": "https://www.mlb.com/whitesox/",
  "Seattle Mariners": "https://www.mlb.com/mariners/",
  "Houston Astros": "https://www.mlb.com/astros/",
  "Los Angeles Angels": "https://www.mlb.com/angels/",
  "Texas Rangers": "https://www.mlb.com/rangers/",
  "Athletics": "https://www.mlb.com/athletics/",
  "St. Louis Cardinals": "https://www.mlb.com/cardinals/",
  "Milwaukee Brewers": "https://www.mlb.com/brewers/",
  "Chicago Cubs": "https://www.mlb.com/cubs/",
  "Cincinnati Reds": "https://www.mlb.com/reds/",
  "Pittsburgh Pirates": "https://www.mlb.com/pirates/",
  "Miami Marlins": "https://www.mlb.com/marlins/",
  "Washington Nationals": "https://www.mlb.com/nationals/",
  "Atlanta Braves": "https://www.mlb.com/braves/",
  "New York Mets": "https://www.mlb.com/mets/",
  "Philadelphia Phillies": "https://www.mlb.com/phillies/",
  "San Diego Padres": "https://www.mlb.com/padres/",
  "Colorado Rockies": "https://www.mlb.com/rockies/",
  "San Francisco Giants": "https://www.mlb.com/giants/",
  "Los Angeles Dodgers": "https://www.mlb.com/dodgers/",
  "Arizona Diamondbacks": "https://www.mlb.com/diamondbacks/",
};

// Go Yankees!
const divisionTeams = {
  "AL Central": [
    "Cleveland Guardians",
    "Detroit Tigers",
    "Kansas City Royals",
    "Minnesota Twins",
    "Chicago White Sox",
  ],
  "AL East": [
    "Tampa Bay Rays",
    "Toronto Blue Jays",
    "Baltimore Orioles",
    "New York Yankees",
    "Boston Red Sox",
  ],
  "AL West": [
    "Seattle Mariners",
    "Houston Astros",
    "Los Angeles Angels",
    "Texas Rangers",
    "Oakland Athletics",
  ],
  "NL Central": [
    "St. Louis Cardinals",
    "Milwaukee Brewers",
    "Chicago Cubs",
    "Cincinnati Reds",
    "Pittsburgh Pirates",
  ],
  "NL East": [
    "Miami Marlins",
    "Washington Nationals",
    "Atlanta Braves",
    "New York Mets",
    "Philadelphia Phillies",
  ],
  "NL West": [
    "San Diego Padres",
    "Colorado Rockies",
    "San Francisco Giants",
    "Los Angeles Dodgers",
    "Arizona Diamondbacks",
  ],
};

const Standings = () => {
  const navigate = useNavigate();
  const [alStandings, setALStandings] = useState([]);
  const [nlStandings, setNLStandings] = useState([]);
  const [view, setView] = useState(() => localStorage.getItem("standingsView") || "League");
  const [loading, setLoading] = useState(true);

  /* const divisionNameMap = {
    "AL Central": "American League Central",
    "AL East": "American League East",
    "AL West": "American League West",
    "NL Central": "National League Central",
    "NL East": "National League East",
    "NL West": "National League West",
  };
  */
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

  const handleSetView = (newView) => {
    setView(newView);
    localStorage.setItem('standingsView', newView);
  }

  const sortLeagueStandings = (standings) => {
    return standings
      .flatMap((division) => {
        if (!Array.isArray(division.teamRecords)) {
          console.warn(
            "Missing or invalid teamRecords for division:",
            division
          );
          return [];
        }
        return division.teamRecords;
      })
      .sort(
        (a, b) =>
          parseFloat(b.winningPercentage) - parseFloat(a.winningPercentage)
      );
  };

  const getDivisionStandings = (standings, divisionName) => {
    const teamsInDivision = divisionTeams[divisionName];
    return standings.flatMap((division) => {
      if (!Array.isArray(division.teamRecords)) {
        console.warn("Missing or invalid teamRecords for division:", division);
        return [];
      }
      return division.teamRecords.filter((teamRecord) =>
        teamsInDivision.includes(teamRecord.team?.name)
      );
    });
  };

  const renderLeagueTable = (standings) => {
    const sortedStandings = sortLeagueStandings(standings);

    if (!sortedStandings || sortedStandings.length === 0) {
      return (
        <p className="text-center text-white">No standings data available</p>
      );
    }

    return (
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="Team-name">Team</th>
            <th className="stat-col">W</th>
            <th className="stat-col">L</th>
            <th className="stat-col">Win %</th>
            <th className="stat-col">GB</th>
          </tr>
        </thead>
        <tbody>
          {sortedStandings.map((record, index) => {
            return (
              <tr key={index}>
                <td>
                  {record.team?.name && teamURLS[record.team.name] ? (
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                      <a
                        href={teamURLS[record.team.name]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {record.team.name}
                      </a>
                      <Button
                        variant="outline-light"
                        className="mt-2 mt-md-0 ms-md-auto"
                        size="sm"
                        onClick={() => {
                          const teamId = record.team?.id;
                          if (!teamId) {
                            console.error(
                              "Team ID not available for:",
                              record.team?.name
                            );
                            return;
                          }
                          navigate(`/team/${teamId}`);
                        }}
                      >
                        Stats
                      </Button>
                    </div>
                  ) : (
                    record.team?.name || "N/A"
                  )}
                </td>
                <td>{record.wins || "N/A"}</td>
                <td>{record.losses || "N/A"}</td>
                <td>{record.winningPercentage || "N/A"}</td>
                <td>{record.gamesBack || "N/A"}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  };

  const renderDivisionStandings = (divisionName, standings) => {
    const divisionStandings = getDivisionStandings(standings, divisionName);

    if (!divisionStandings || divisionStandings.length === 0) {
      return (
        <p className="text-center text-white">
          No standings data available for: {divisionName}.
        </p>
      );
    }

    return (
      <div>
        <h4 className="text-center text-white">{divisionName}</h4>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="Team-name">Team</th>
              <th className="stat-col">W</th>
              <th className="stat-col">L</th>
              <th className="stat-col">Win %</th>
              <th className="stat-col">GB</th>
            </tr>
          </thead>
          <tbody>
            {divisionStandings.map((record, index) => (
              <tr key={index}>
                <td>
                  {record.team?.name && teamURLS[record.team.name] ? (
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center">
                      <a
                        href={teamURLS[record.team.name]}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        {record.team.name}
                      </a>
                      <Button
                        variant="outline-light"
                        className="mt-2 mt-md-0 ms-md-auto"
                        size="sm"
                        onClick={() => {
                          const teamId = record.team?.id;
                          if (!teamId) {
                            console.error(
                              "Team ID not available for:",
                              record.team?.name
                            );
                            return;
                          }
                          navigate(`/team/${teamId}`);
                        }}
                      >
                        Stats
                      </Button>
                    </div>
                  ) : (
                    record.team?.name || "N/A"
                  )}
                </td>
                <td>{record.wins || "N/A"}</td>
                <td>{record.losses || "N/A"}</td>
                <td>{record.winningPercentage || "N/A"}</td>
                <td>{record.gamesBack || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <hr className="text-white" />
      </div>
    );
  };
  return (
    <div>
      <h2 className="text-center text-white">MLB 2025 Standings</h2>

      <Dropdown className="mb-4 text-center">
        <Dropdown.Toggle variant="dark" id="dropdown-basic" className="mt-5">
          {view === "League" ? "League Standings" : "Division Standings"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleSetView("League")}>
            League Standings
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleSetView("Division")}>
            Division Standings
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

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

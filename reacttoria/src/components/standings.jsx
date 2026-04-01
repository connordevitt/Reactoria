import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { TrophyIcon, CalendarIcon } from '@heroicons/react/24/outline';

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
  "Oakland Athletics": "https://www.mlb.com/athletics/",
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

const Standings = () => {
  const navigate = useNavigate();
  const [alStandings, setALStandings] = useState([]);
  const [nlStandings, setNLStandings] = useState([]);
  const [view, setView] = useState("League");

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
    const divisionMap = {
      "AL East": 201,
      "AL Central": 202,
      "AL West": 200,
      "NL East": 204,
      "NL Central": 205,
      "NL West": 203
    };

    const targetDivisionId = divisionMap[divisionName];
    if (!targetDivisionId) {
      console.warn(`Unknown division: ${divisionName}`);
      return [];
    }

    return standings.flatMap((division) => {
      if (!Array.isArray(division.teamRecords)) {
        console.warn("Missing or invalid teamRecords for division:", division);
        return [];
      }

      if (division.division?.id === targetDivisionId) {
        return division.teamRecords;
      }
      return [];
    });
  };

  const renderLeagueTable = (standings) => {
    const sortedStandings = sortLeagueStandings(standings);

    if (!sortedStandings || sortedStandings.length === 0) {
      return (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-dark-800 rounded-full mb-4">
            <TrophyIcon className="h-8 w-8 text-dark-500" />
          </div>
          <p className="text-dark-400">No standings data available</p>
        </div>
      );
    }

    return (
      <>
        {/* Mobile Card Layout */}
        <div className="sm:hidden space-y-3">
          {sortedStandings.map((record, index) => (
            <div
              key={index}
              className="bg-dark-800/50 rounded-lg p-3 border border-dark-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center border border-primary-500/30">
                      <img
                        src={`https://www.mlbstatic.com/team-logos/${record.team?.id}.svg`}
                        alt={record.team?.name}
                        className="w-6 h-6 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <a
                      href={teamURLS[record.team.name]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-primary-400 transition-colors text-sm block truncate"
                    >
                      {record.team.name}
                    </a>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs font-semibold text-white">{record.wins}-{record.losses}</span>
                      <span className={`inline-flex px-1.5 py-0.5 rounded text-xs font-medium ${parseFloat(record.winningPercentage) > 0.600
                          ? 'bg-green-500/20 text-green-400'
                          : parseFloat(record.winningPercentage) > 0.500
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}>
                        {record.winningPercentage}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const teamId = record.team?.id;
                    if (!teamId) return;
                    navigate(`/team/${teamId}`);
                  }}
                  className="btn-outline text-xs px-3 py-1.5 ml-2 flex-shrink-0"
                >
                  Stats
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden sm:block">
          <div className="overflow-hidden rounded-xl border border-dark-700">
            <table className="standings-table">
              <thead>
                <tr>
                  <th className="text-left">Team</th>
                  <th className="w-16 text-center">W</th>
                  <th className="w-16 text-center">L</th>
                  <th className="w-20 text-center hidden md:table-cell">Win %</th>
                  <th className="w-16 text-center hidden lg:table-cell">GB</th>
                </tr>
              </thead>
              <tbody>
                {sortedStandings.map((record, index) => (
                  <tr key={index} className="group hover:bg-dark-800/50 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center border border-primary-500/30">
                            <img
                              src={`https://www.mlbstatic.com/team-logos/${record.team?.id}.svg`}
                              alt={record.team?.name}
                              className="w-6 h-6 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        </div>
                        <div className="min-w-0">
                          <a
                            href={teamURLS[record.team.name]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white font-medium hover:text-primary-400 transition-colors block truncate"
                          >
                            {record.team.name}
                          </a>
                          <div className="text-xs text-dark-500 hidden md:block">
                            {record.team?.division?.name}
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const teamId = record.team?.id;
                            if (!teamId) return;
                            navigate(`/team/${teamId}`);
                          }}
                          className="btn-outline text-xs px-3 py-1 sm:text-sm sm:px-4 sm:py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                        >
                          Stats
                        </button>
                      </div>
                    </td>
                    <td className="text-center font-semibold text-white">{record.wins || "N/A"}</td>
                    <td className="text-center text-dark-400">{record.losses || "N/A"}</td>
                    <td className="text-center hidden md:table-cell">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${parseFloat(record.winningPercentage) > 0.600
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : parseFloat(record.winningPercentage) > 0.500
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                        {record.winningPercentage || "N/A"}
                      </span>
                    </td>
                    <td className="text-center text-dark-400 hidden lg:table-cell">{record.gamesBack || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const renderDivisionStandings = (divisionName, standings) => {
    const divisionStandings = getDivisionStandings(standings, divisionName);

    if (!divisionStandings || divisionStandings.length === 0) {
      return (
        <div className="text-center py-6">
          <p className="text-dark-400">
            No standings data available for: {divisionName}
          </p>
        </div>
      );
    }

    return (
      <div className="mb-6 sm:mb-8">
        <div className="flex items-center mb-3 sm:mb-4">
          <TrophyIcon className="h-5 w-5 text-primary-400 mr-2" />
          <h3 className="text-lg sm:text-xl font-bold text-white">{divisionName}</h3>
        </div>

        {/* Mobile Card Layout */}
        <div className="sm:hidden space-y-2">
          {divisionStandings.map((record, index) => (
            <div
              key={index}
              className="bg-dark-800/50 rounded-lg p-3 border border-dark-700"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="w-9 h-9 bg-primary-500/20 rounded-lg flex items-center justify-center border border-primary-500/30">
                      <img
                        src={`https://www.mlbstatic.com/team-logos/${record.team?.id}.svg`}
                        alt={record.team?.name}
                        className="w-5 h-5 object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <a
                      href={teamURLS[record.team.name]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white font-medium hover:text-primary-400 transition-colors text-sm block truncate"
                    >
                      {record.team.name}
                    </a>
                    <div className="flex items-center space-x-2 mt-0.5">
                      <span className="text-xs font-semibold text-white">{record.wins}-{record.losses}</span>
                      <span className="text-xs text-dark-500">GB: {record.gamesBack || "-"}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const teamId = record.team?.id;
                    if (!teamId) return;
                    navigate(`/team/${teamId}`);
                  }}
                  className="btn-outline text-xs px-2.5 py-1 ml-2 flex-shrink-0"
                >
                  Stats
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Table Layout */}
        <div className="hidden sm:block">
          <div className="overflow-hidden rounded-xl border border-dark-700">
            <table className="standings-table">
              <thead>
                <tr>
                  <th className="text-left">Team</th>
                  <th className="w-16 text-center">W</th>
                  <th className="w-16 text-center">L</th>
                  <th className="w-20 text-center hidden md:table-cell">Win %</th>
                  <th className="w-16 text-center">GB</th>
                </tr>
              </thead>
              <tbody>
                {divisionStandings.map((record, index) => (
                  <tr key={index} className="group hover:bg-dark-800/50 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center border border-primary-500/30">
                            <img
                              src={`https://www.mlbstatic.com/team-logos/${record.team?.id}.svg`}
                              alt={record.team?.name}
                              className="w-6 h-6 object-contain"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          </div>
                        </div>
                        <a
                          href={teamURLS[record.team.name]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white font-medium hover:text-primary-400 transition-colors truncate"
                        >
                          {record.team.name}
                        </a>
                        <button
                          onClick={() => {
                            const teamId = record.team?.id;
                            if (!teamId) return;
                            navigate(`/team/${teamId}`);
                          }}
                          className="btn-outline text-xs px-3 py-1 sm:text-sm sm:px-4 sm:py-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                        >
                          Stats
                        </button>
                      </div>
                    </td>
                    <td className="text-center font-semibold text-white">{record.wins || "N/A"}</td>
                    <td className="text-center text-dark-400">{record.losses || "N/A"}</td>
                    <td className="text-center hidden md:table-cell">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${parseFloat(record.winningPercentage) > 0.600
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : parseFloat(record.winningPercentage) > 0.500
                            ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}>
                        {record.winningPercentage || "N/A"}
                      </span>
                    </td>
                    <td className="text-center text-dark-400">{record.gamesBack || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-16 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4">
            MLB 2026 Standings
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-dark-400 mb-6 sm:mb-8">
            Track your favorite teams journey to playoffs
          </p>

          {/* View Toggle */}
          <div className="inline-flex rounded-lg border border-dark-700 bg-dark-800/50 p-1">
            <button
              onClick={() => setView("League")}
              className={`px-3 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${view === "League"
                  ? "bg-primary-600 text-white shadow-lg"
                  : "text-dark-400 hover:text-white hover:bg-dark-700"
                }`}
            >
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <TrophyIcon className="h-4 w-4" />
                <span className="hidden xs:inline">League</span>
                <span className="xs:hidden">League</span>
              </div>
            </button>
            <button
              onClick={() => setView("Division")}
              className={`px-3 sm:px-6 py-2 rounded-md font-medium transition-all text-sm sm:text-base ${view === "Division"
                  ? "bg-primary-600 text-white shadow-lg"
                  : "text-dark-400 hover:text-white hover:bg-dark-700"
                }`}
            >
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <CalendarIcon className="h-4 w-4" />
                <span className="hidden xs:inline">Division</span>
                <span className="xs:hidden">Division</span>
              </div>
            </button>
          </div>
        </div>

        {view === "League" ? (
          <div className="space-y-8">
            {/* American League */}
            <div className="content-card">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">AL</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">American League</h2>
                </div>
                {renderLeagueTable(alStandings)}
              </div>
            </div>

            {/* National League */}
            <div className="content-card">
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">NL</span>
                  </div>
                  <h2 className="text-2xl font-bold text-white">National League</h2>
                </div>
                {renderLeagueTable(nlStandings)}
              </div>
            </div>
          </div>
        ) : (
          <div className="content-card">
            <div className="p-6">
              {renderDivisionStandings("AL East", alStandings)}
              {renderDivisionStandings("AL Central", alStandings)}
              {renderDivisionStandings("AL West", alStandings)}
              {renderDivisionStandings("NL East", nlStandings)}
              {renderDivisionStandings("NL Central", nlStandings)}
              {renderDivisionStandings("NL West", nlStandings)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Standings;
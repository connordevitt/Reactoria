//Teampage.jsx display a team dynamically to show team data.

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  ArrowLeftIcon,
  UserIcon,
  CalendarIcon,
  ChartBarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const Teampage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [recentGames, setRecentGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [roster, setRoster] = useState([]);
  const [rosterLoading, setRosterLoading] = useState(false);
  const [rosterError, setRosterError] = useState(null);
  // const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handlePlayerClick = async (playerId) => {
    // setSelectedPlayer(playerId);
    setStatsLoading(true);
    setStatsError(null);
    setPlayerStats(null);
    setIsModalOpen(true);
    try {
      const year = new Date().getFullYear();
      const response = await fetch(
        `https://statsapi.mlb.com/api/v1/people/${playerId}/stats?stats=season&season=${year}`,
      );
      if (!response.ok) throw new Error("Failed to fetch player stats");
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
          `https://statsapi.mlb.com/api/v1/teams/${teamId}`,
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
          throw new Error("No dates data in response");
        }

        // if (json.dates[0]?.games?.[0]) {
        //   console.log('Sample Game Structure:', JSON.stringify(json.dates[0].games[0], null, 2));
        // }

        const games = json.dates.flatMap((d) => d.games || []);
        const recentFive = games.slice(-5).reverse();
        setRecentGames(recentFive);
      } catch (error) {
        console.error("Error fetching recent games:", error);
        setError(error.message);
      }
    };
    fetchRecentGames();
  }, [teamId]);

  useEffect(() => {
    if (!teamId) return;
    setRoster([]);
    setRosterLoading(true);
    setRosterError(null);

    fetch(`https://statsapi.mlb.com/api/v1/teams/${teamId}/roster?rosterType=depthChart`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to get the roster");
        return res.json();
      })
      .then((data) => {
        setRoster(data.roster || []);
        setRosterLoading(false);
      });
  }, [teamId]);

  useEffect(() => {
    if (playerStats) {
      console.log("Player Stats:", playerStats);
    }
  }, [playerStats]);

  if (loading) return <div className="text-white text-center">Loading...</div>;
  if (error)
    return <div className="text-white text-center">Error: {error}</div>;
  if (!team)
    return <div className="text-white text-center">No team data available</div>;

  return (
    <div className="min-h-screen bg-dark-900 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => window.history.back()}
          className="mb-6 btn-secondary inline-flex items-center"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Back to Standings
        </button>

        {/* Team Header */}
        <div className="content-card mb-8 overflow-hidden">
          <div className="bg-dark-800/50 p-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-24 h-24 rounded-2xl flex items-center justify-center border border-dark-600 bg-gray-200 shadow-xl">
                <div className="w-20 h-20 flex items-center justify-center">
                  <img
                    src={`https://www.mlbstatic.com/team-logos/${team.id}.svg`}
                    alt={team.name}
                    className="w-full h-full object-contain drop-shadow-md"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="hidden w-full h-full items-center justify-center">
                    <span className="text-3xl font-bold text-primary-500">
                      {team.name?.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                  {team.name}
                </h1>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-primary-600/20 text-primary-400 border border-primary-500/30">
                    {team.league?.name || "N/A"}
                  </span>
                  <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-dark-700 text-dark-300 border border-dark-600">
                    {team.division?.name || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="glass rounded-xl border border-white/10 overflow-hidden">
          <div className="border-b border-dark-700">
            <nav className="flex space-x-1 p-1">
              {["overview", "roster"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab
                      ? "bg-primary-600 text-white shadow-lg"
                      : "text-dark-400 hover:text-white hover:bg-dark-800/50"
                  }`}
                >
                  {tab === "overview" ? (
                    <>
                      <ChartBarIcon className="h-5 w-5" />
                      <span>Overview</span>
                    </>
                  ) : (
                    <>
                      <UserIcon className="h-5 w-5" />
                      <span>Roster</span>
                    </>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-4 sm:p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* Team Info */}
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="content-card p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center mr-3">
                        <UserIcon className="h-5 w-5 text-primary-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        Team Info
                      </h3>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="text-dark-500 text-sm">Venue</p>
                        <p className="text-white font-medium">
                          {team.venue?.name || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-dark-500 text-sm">Location</p>
                        <p className="text-white font-medium">
                          {team.locationName || "N/A"}
                        </p>
                      </div>
                      <div>
                        <p className="text-dark-500 text-sm">First Year</p>
                        <p className="text-white font-medium">
                          {team.firstYearOfPlay || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 content-card p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-primary-600/20 rounded-lg flex items-center justify-center mr-3">
                        <CalendarIcon className="h-5 w-5 text-primary-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        Recent Games
                      </h3>
                    </div>
                    <div className="space-y-2">
                      {recentGames.length === 0 ? (
                        <p className="text-dark-400">No recent games found.</p>
                      ) : (
                        recentGames.map((game) => {
                          const homeWon = game.teams?.home?.isWinner;
                          const awayWon = game.teams?.away?.isWinner;
                          const isFinal =
                            game.status?.abstractGameState === "Final";
                          return (
                            <div
                              key={game.gamePk}
                              className="grid grid-cols-[1fr_auto_1fr] items-center p-3 bg-dark-800/50 rounded-lg"
                            >
                              <span className="text-white font-medium text-left">
                                {game.teams?.home?.team?.name || "TBD"}
                                {isFinal && (
                                  <span
                                    className={
                                      homeWon
                                        ? "text-green-400 ml-2"
                                        : "text-red-400 ml-2"
                                    }
                                  >
                                    {homeWon ? "W" : "L"}
                                  </span>
                                )}
                              </span>
                              <span className="text-primary-400 px-2 sm:px-4 text-center shrink-0">
                                vs
                              </span>
                              <span className="text-white font-medium text-right">
                                {isFinal && (
                                  <span
                                    className={
                                      awayWon
                                        ? "text-green-400 mr-2"
                                        : "text-red-400 mr-2"
                                    }
                                  >
                                    {awayWon ? "W" : "L"}
                                  </span>
                                )}
                                {game.teams?.away?.team?.name || "TBD"}
                              </span>
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "roster" && (
              <div>
                {rosterLoading && (
                  <div className="text-center py-12">
                    <div className="spinner mx-auto mb-4"></div>
                    <p className="text-dark-400">Loading roster...</p>
                  </div>
                )}

                {rosterError && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                    <p className="text-red-400">Error: {rosterError}</p>
                  </div>
                )}

                {!rosterLoading && !rosterError && roster.length === 0 && (
                  <div className="text-center py-12">
                    <UserIcon className="h-16 w-16 text-dark-600 mx-auto mb-4" />
                    <p className="text-dark-400">No roster data found.</p>
                  </div>
                )}

                {roster.length > 0 && (
                  <div className="space-y-8">
                    {(() => {
                      const positionGroups = {};
                      roster.forEach((player) => {
                        const position = player.position.name;
                        if (!positionGroups[position]) {
                          positionGroups[position] = [];
                        }
                        positionGroups[position].push(player);
                      });

                      const positionOrder = [
                        "Pitcher",
                        "Starting Pitcher",
                        "Relief Pitcher",
                        "Catcher",
                        "First Baseman",
                        "Second Baseman",
                        "Third Baseman",
                        "Shortstop",
                        "Left Fielder",
                        "Center Fielder",
                        "Right Fielder",
                        "Designated Hitter",
                      ];

                      const sortedPositions = Object.keys(positionGroups).sort(
                        (a, b) => {
                          const aIndex = positionOrder.indexOf(a);
                          const bIndex = positionOrder.indexOf(b);
                          if (aIndex === -1 && bIndex === -1)
                            return a.localeCompare(b);
                          if (aIndex === -1) return 1;
                          if (bIndex === -1) return -1;
                          return aIndex - bIndex;
                        },
                      );

                      return sortedPositions.map((position) => (
                        <div key={position}>
                          <div className="flex items-center mb-4">
                            <div className="w-8 h-8 bg-primary-600/20 rounded-lg flex items-center justify-center mr-3">
                              <UserIcon className="h-4 w-4 text-primary-400" />
                            </div>
                            <h3 className="text-xl font-semibold text-white">
                              {position}s ({positionGroups[position].length})
                            </h3>
                          </div>
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {positionGroups[position]
                              .sort((a, b) => {
                                const aNum = parseInt(a.jerseyNumber) || 999;
                                const bNum = parseInt(b.jerseyNumber) || 999;
                                if (aNum !== bNum) return aNum - bNum;
                                return a.person.fullName.localeCompare(
                                  b.person.fullName,
                                );
                              })
                              .map((player) => (
                                <div
                                  key={player.person.id}
                                  className="content-card p-4 cursor-pointer hover:border-primary-500/50 transition-all"
                                  onClick={() =>
                                    handlePlayerClick(player.person.id)
                                  }
                                >
                                  <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-dark-600 bg-dark-800 shrink-0">
                                      <img
                                        src={`https://img.mlbstatic.com/mlb-photos/image/upload/d_people:generic:headshot:67:current.png/w_100,q_auto:best/v1/people/${player.person.id}/headshot/67/current`}
                                        alt={player.person.fullName}
                                        className="w-full h-full object-cover"
                                      />

                                      <span className="text-primary-400 font-bold text-sm">
                                        {player.jerseyNumber || "N/A"}
                                      </span>
                                    </div>
                                    <div>
                                      <h4 className="text-white font-medium hover:text-primary-400 transition-colors">
                                        {player.person.fullName}
                                      </h4>
                                      <p className="text-dark-400 text-sm flex items-center gap-2">
                                        {player.position.name}
                                        {player.status?.description?.includes("Injured List") && (
                                          <span className="text-red-400 text-xs font-semibold bg-red-500/15 px-1.5 py-0.5 rounded">
                                            IL
                                          </span>
                                        )}
                                      </p>
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
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Player Stats Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="content-card max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-dark-800 border-b border-dark-700 p-6 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">
                Player Statistics
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg hover:bg-dark-700 transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-dark-400" />
              </button>
            </div>

            <div className="p-6">
              {statsLoading && (
                <div className="text-center py-8">
                  <div className="spinner mx-auto mb-4"></div>
                  <p className="text-dark-400">Loading player stats...</p>
                </div>
              )}

              {statsError && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                  <p className="text-red-400">Error: {statsError}</p>
                </div>
              )}

              {playerStats &&
                playerStats.splits &&
                playerStats.splits.length > 0 && (
                  <div>
                    <p className="text-dark-400 mb-4">
                      Season {playerStats.splits[0].season}
                    </p>
                    <div className="grid gap-2">
                      {Object.entries(playerStats.splits[0].stat).map(
                        ([key, value]) => (
                          <div
                            key={key}
                            className="flex justify-between items-center p-3 bg-dark-800/50 rounded-lg"
                          >
                            <span className="text-dark-400 capitalize">
                              {key.replace(/([A-Z])/g, " $1").trim()}
                            </span>
                            <span className="text-white font-semibold">
                              {value}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}

              {!statsLoading &&
                !statsError &&
                (!playerStats ||
                  !playerStats.splits ||
                  playerStats.splits.length === 0) && (
                  <div className="text-center py-8">
                    <ChartBarIcon className="h-16 w-16 text-dark-600 mx-auto mb-4" />
                    <p className="text-dark-400">
                      No stats available for this player.
                    </p>
                  </div>
                )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Teampage;

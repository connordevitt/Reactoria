//Teampage.jsx display a team dynamically to show team data. 

import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import AOS from "aos";
import "aos/dist/aos.css";

const Teampage = () => {
  const { teamId } = useParams();
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    useEffect(() => {
    const fetchTeamData = async () => {
        console.log('TeamID from params:', teamId);
        
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
            <div className="card-header text-center">
              <Button variant="outline-light" href="/Reactoria/leaguestandings">
                Back to Standings
              </Button>
            </div>
            <div className="card-body p-4">
              <h1 className="text-center mb-4">{team.name}</h1>
              <div className="row justify-content-center">
                <div className="col-11">
                  <h4 className="border-bottom pb-2 mb-3">Team Info</h4>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                  League: {team.league?.name || 'N/A'}
                </li>
                    <li className="mb-2">Division: {team.division?.name || "N/A"}</li>
                    <li className="mb-2">Venue: {team.venue?.name || "N/A"}</li>
                    <li className="mb-2">Location: {team.locationName || "N/A"}</li>
                    <li className="mb-2">First Year: {team.firstYearOfPlay || "N/A"}</li>
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
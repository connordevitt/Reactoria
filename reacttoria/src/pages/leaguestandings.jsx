//leaguestandings.jsx will be the main page displaying the standings.jsx component and the navbar component. It will a second page that you can go to after app.jsx

import React from "react";
import NavBar from "../components/navbar";
import Standings from "../components/standings";

const LeagueStandings = () => {
    return (
        <div>    
            <NavBar />
            <Standings />
        </div>
    );
};

export default LeagueStandings;
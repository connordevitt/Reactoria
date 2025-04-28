//leaguestandings.jsx
import React, { useEffect } from "react";
import NavBar from "../components/navbar";
import LazyLoadSpinner from "../components/lazyload";
import { Suspense } from "react";
import { useState } from "react";


const LazyStandings = React.lazy(() =>
    import("../components/standings")
  );
  
  const LeagueStandings = () => {
    const [showSpinner, setShowSpinner] = useState(false);
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSpinner(true);
      }, 3000); // Fallback incase the component takes too long to load.
  
      return () => clearTimeout(timer); // Clear timeout on unmount
    }, []);
  
    return (
      <div>
        <NavBar />
        <Suspense fallback={showSpinner ? <LazyLoadSpinner /> : null}>
          <LazyStandings />
        </Suspense>
      </div>
    );
  };
  
export default LeagueStandings;
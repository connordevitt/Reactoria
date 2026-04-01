import React, { useState, useEffect } from "react";
import LazyLoadSpinner from "../components/lazyload";
import { Suspense } from "react";

const LazyStandings = React.lazy(() =>
    import("../components/standings")
  );
const LeagueStandings = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    return (
      <div>
        <Suspense fallback={showSpinner ? <LazyLoadSpinner /> : null}>
          <LazyStandings />
        </Suspense>
      </div>
    );
  };
  
export default LeagueStandings;
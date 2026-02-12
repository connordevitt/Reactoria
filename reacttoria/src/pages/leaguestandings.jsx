import React, { useState, useEffect } from "react";
import LazyLoadSpinner from "../components/lazyload";
import { Suspense } from "react";
import { TrophyIcon } from '@heroicons/react/24/outline';

const LazyStandings = React.lazy(() =>
    import("../components/standings")
  );
  
  const DODGERS_MODAL_KEY = "dodgers-splash-seen";

const LeagueStandings = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [showSplashModal, setShowSplashModal] = useState(
      () => !sessionStorage.getItem(DODGERS_MODAL_KEY)
    );
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSpinner(true);
      }, 3000); 
  
      return () => clearTimeout(timer); 
    }, []);

    const handleCloseModal = () => {
      sessionStorage.setItem(DODGERS_MODAL_KEY, "true");
      setShowSplashModal(false);
    };
  
    return (
      <div>
        {showSplashModal && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="content-card max-w-lg w-full">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrophyIcon className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Dodgers Won 2025 World Series!
                </h2>
                <div className="text-dark-300 mb-6">
                  <p className="text-lg mb-4">
                    Congratulations to the Dodgers on their 2025 World Series Championship! 
                    It was a great first season for MLB Standings Tracker!
                  </p>
                  <p className="font-medium">
                    Thank you for using our tracker! We'll be back next season with better features and more data!
                  </p>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <Suspense fallback={showSpinner ? <LazyLoadSpinner /> : null}>
          <LazyStandings />
        </Suspense>
      </div>
    );
  };
  
export default LeagueStandings;
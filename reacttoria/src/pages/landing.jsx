
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      
      <div className="relative min-h-screen flex items-center justify-center">
        
        <div 
          className="absolute inset-0 bg-dark-900 hidden md:block"
          style={{ 
            backgroundImage: 'url(/Reactoria/images/wrigley3.jpg)', 
            backgroundPosition: '15% center',
            backgroundSize: 'auto 120%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-dark-900/50"></div>
        </div>
        
        {/* Mobile Background - different positioning */}
        <div 
          className="absolute inset-0 bg-dark-900 md:hidden"
          style={{ 
            backgroundImage: 'url(/Reactoria/images/wrigley3.jpg)', 
            backgroundPosition: '47% center',
            backgroundSize: 'auto 150%',
            backgroundRepeat: 'no-repeat'
          }}
        >
          <div className="absolute inset-0 bg-dark-900/50"></div>
        </div>
        
        
        <div className="relative z-10 container mx-auto px-4 text-center" data-aos="fade-down">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-4 sm:mb-6">
            Welcome to MLB Standings Tracker
          </h1>
          <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-200 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
            Stay up to date with the latest MLB standings and follow your
            favorite teams!
          </p>
          <button
            onClick={() => navigate("/leaguestandings")}
            className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 w-full sm:w-auto"
          >
            View Standings
          </button>
        </div>
      </div>

      
      <main className="container mx-auto px-4 py-8 sm:py-12 md:py-16">
        
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8" data-aos="fade-right">
          <div className="content-card p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              What is MLB Standings Tracker?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              We're committed to providing accurate, up-to-date MLB standings
              with a user-friendly interface. Whether you're a die-hard
              fan or just looking to catch up on the latest standings, we've got
              you covered!
            </p>
          </div>
        </div>

        
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8" data-aos="fade-left">
          <div className="content-card p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              Have a favorite team?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Follow your favorite MLB teams as they climb the standings and
              chase a spot in the playoffs. We break down everything from wins
              and losses to win percentage, so you always know where your team
              stands. Whether you're backing the Yankees, Cubs, or anyone else,
              all the info you need is right here!
            </p>
          </div>
        </div>

        
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8" data-aos="fade-up">
          <div className="content-card p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-4 sm:mb-6">
              Why choose us?
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              With our user-friendly interface and real-time updates, you'll
              never miss a moment of excitement in the world of MLB. Join us
              today and stay ahead of the game!
            </p>
          </div>
        </div>
      </main>

      
      <footer className="bg-dark-950 border-t border-dark-800 py-6 sm:py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-xs sm:text-sm mb-2 sm:mb-3">
            &copy; {new Date().getFullYear()} MLB Standings Tracker. All rights reserved.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Created by:{" "}
            <a
              href="https://github.com/connordevitt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300 transition-colors"
            >
              Connor Devitt
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
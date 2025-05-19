// landing.jsx

import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="bg-dark text-white min-vh-100 d-flex flex-column justify-content-between">
      <header className="hero-section text-center py-5" data-aos="fade-down">
        <div className="container">
          <h1 className="display-4 fw-bold">
            Welcome to MLB Standings Tracker
          </h1>
          <p className="lead fw-bold w-100 mx-auto">
            Stay up to date with the latest MLB standings and follow your
            favorite teams!
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/leaguestandings")}
          >
            View Standings
          </Button>
        </div>
      </header>

      <main className="container text-center py-4">
        <div className="row ">
          <div
            className="card bg-secondary text-white mb-4"
            data-aos="fade-right"
          >
            <div className="card-body">
              <h2 className="card-title fw-bold">
                What is MLB Standings Tracker?
              </h2>
              <p className="card-text">
                We're committed to providing accurate, up-to-date MLB standings
                with a user-friendly interface. Whether you're a die-hard
                fan or just looking to catch up on the latest standings, we've got
                you covered!
              </p>
            </div>
          </div>
        </div>
        <div className="card bg-secondary text-white mb-4" data-aos="fade-left">
          <div className="card-body">
            <h2 className="card-title fw-bold">Have a favorite team?</h2>
            <p className="card-text">
              Follow your favorite MLB teams as they climb the standings and
              chase a spot in the playoffs. We break down everything from wins
              and losses to win percentage, so you always know where your team
              stands. Whether you're backing the Yankees, Cubs, or anyone else,
              all the info you need is right here!
            </p>
          </div>
        </div>

        <div className="card bg-secondary text-white mb-4" data-aos="fade-up">
          <div className="card-body">
            <h2 className="card-title fw-bold">Why choose us?</h2>
            <p className="card-text">
              With our user-friendly interface and real-time updates, you'll
              never miss a moment of excitement in the world of MLB. Join us
              today and stay ahead of the game!
            </p>
          </div>
        </div>
      </main>

      <footer className="bg-dark py-3 mx-auto w-100">
        <div
          id="footer-content"
          className="container text-center sticky-footer"
        >
          <small className="text-white">
            &copy; {new Date().getFullYear()} MLB Standings Tracker. All rights
            reserved.
          </small>
          <p className="text-white mt-2 text-center">
            Created by:{" "}
            <a
              href="https://github.com/connordevitt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
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

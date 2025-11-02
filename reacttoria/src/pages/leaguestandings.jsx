//leaguestandings.jsx
import React, { useEffect } from "react";
import { Modal, Button} from "react-bootstrap";
import NavBar from "../components/navbar";
import LazyLoadSpinner from "../components/lazyload";
import { Suspense } from "react";
import { useState } from "react";


const LazyStandings = React.lazy(() =>
    import("../components/standings")
  );
  
  const LeagueStandings = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    const [showSplashModal, setShowSplashModal] = useState(true);
  
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowSpinner(true);
      }, 3000); 
  
      return () => clearTimeout(timer); 
    }, []);

    const handleCloseModal = () => {
      setShowSplashModal(false);
    };
  
    return (
      <div>
        <NavBar />

        <Modal 
          show={showSplashModal}
          onHide={handleCloseModal}
          centered
          backdrop="static"
          keyboard={true}
          >

            <Modal.Header className="bg-dark text-white border-0"> 
              <Modal.Title className="w-100 text-center fw-bold border-bottom border-warning pb-2">
                The Dodgers Won the 2025 World Series!
              </Modal.Title>
              </Modal.Header>

              

              <Modal.Body className="bg-dark text-white text-center">
                <div className="mb-3">
                  <h4>Congratulations to the Dodgers on their 2025 World Series Championship! It was a great first season for MLB Standings Tracker!</h4>
                  <p className="bold">Thank you for using our tracker! We'll be back next season with better features and more data!</p>
                </div>
              </Modal.Body>

              <Modal.Footer className=" bg-dark border-0 justify-content-center">
                <Button variant="primary" onClick={handleCloseModal}>
                  Close
                </Button>
              </Modal.Footer>
          </Modal>

        <Suspense fallback={showSpinner ? <LazyLoadSpinner /> : null}>
          <LazyStandings />
        </Suspense>
      </div>
    );
  };
  
export default LeagueStandings;
import React, { useState } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const [expanded, setExpanded] = useState(false);

return(
  <Navbar 
      bg="dark" 
      variant="dark" 
      expand="lg" 
      className="fixed-top w-100"
      expanded={expanded}
    >
      <Navbar.Brand as={Link} to="/" onClick={() => setExpanded(false)}>
        MLB Standings Tracker
      </Navbar.Brand>
      <Navbar.Toggle 
        aria-controls="basic-navbar-nav" 
        onClick={() => setExpanded(expanded ? false : true)}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link 
            as={Link} 
            to="/leaguestandings" 
            onClick={() => setExpanded(false)}
          >
            League Standings
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
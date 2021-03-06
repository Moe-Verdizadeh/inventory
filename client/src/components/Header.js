import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'; 

function Header({isAuthenticated}) {



    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
          {!isAuthenticated && <Nav.Link as={NavLink} to="/signin">Sign In</Nav.Link>}
          {!isAuthenticated && <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>}
        </Nav> 
      </Navbar>
    )
}

export default Header

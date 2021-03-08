import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'; 

function Header({isAuthenticated}) {



    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand to="/dashboard">Inventory</Navbar.Brand>
        <Nav className="mr-auto">
          <div className="row float-lg-right"> 
            {!isAuthenticated && <Nav.Link as={NavLink} to="/">Home</Nav.Link>}
            {!isAuthenticated && <Nav.Link as={NavLink} to="/signin">Sign In</Nav.Link>}
            {!isAuthenticated && <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>} 
            
          </div>
        </Nav> 
        <Nav inline> 
            {isAuthenticated && <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>}
            {isAuthenticated && <Nav.Link as={NavLink} to="/signout">Sign Out</Nav.Link>}
        </Nav>
      </Navbar>
    )
}

export default Header

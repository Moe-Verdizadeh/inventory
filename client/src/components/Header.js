import React from 'react';
import { NavLink } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap'; 

function Header({isAuthenticated}) {



    return (
        <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/signin">Sign In</Nav.Link>
          {!isAuthenticated && <Nav.Link as={NavLink} to="/signup">Sign Up</Nav.Link>}
          <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
        </Nav>
        {/* <Form inline> 
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form> */}
      </Navbar>
    )
}

export default Header

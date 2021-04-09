import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigations() {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand as={Link} to="/">
          React
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/products">
            Products
          </Nav.Link>
          <Nav.Link as={Link} to="/new">
            Add product
          </Nav.Link>
        </Nav>
        <Nav inline>
          <Nav.Link as={Link} to="/login" className="mr-sm-2">
            Login
          </Nav.Link>
          <Nav.Link as={Link} to="/register" className="">
            Register
          </Nav.Link>
        </Nav>
      </Navbar>
    </div>
  );
}

import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Navigations({ currentUser, isAdmin, logout }) {
  console.log(currentUser);
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand as={Link} to="/">
          React
        </Navbar.Brand>
        {currentUser ? (
          <>
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products">
                Products
              </Nav.Link>

              {isAdmin && (
                <Nav.Link as={Link} to="/new">
                  Add product
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              <Nav.Link className="mr-sm-2" onClick={logout}>
                Cart{'  '}
                <span className="badge badge-danger">
                  {currentUser.cart.items.length}
                </span>
              </Nav.Link>
              <Nav.Link className="mr-sm-2" onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </>
        ) : (
          <>
            <Nav className="mr-sm-2">
              <Nav.Link as={Link} to="/login" className="mr-sm-2">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register" className="">
                Register
              </Nav.Link>
            </Nav>
          </>
        )}
      </Navbar>
    </div>
  );
}

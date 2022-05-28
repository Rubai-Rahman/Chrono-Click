import React from "react";
import { Container, Navbar,Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/favicon.png";
import "./Navigation.css";

const Navigation = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
          />
          CHRONO CLICK
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto my-2 my-lg-0 link">
            <Nav.Link as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/shop">
              Shop
            </Nav.Link>

            <Nav.Link as={Link} to="/order">
              Order
            </Nav.Link>
          </Nav>
          <Nav.Link as={Link} to="/login">
            Sign In
          </Nav.Link>
          <Nav.Link as={Link} to="/singin">
            Sign Up
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

import React from "react";
import { Col, Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../images/favicon.png";
import "./Navigation.css";

const Navigation = () => {
  return (
    <Navbar
      className="Navbar"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
    >
      <Container fluid>
       <div>
       <Navbar.Brand className="logo">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
          CHRONO CLICK
        </Navbar.Brand>
       </div>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="link">
            <Nav.Link className="ml-2" as={Link} to="/home">
              Home
            </Nav.Link>
            <Nav.Link className="ml-2" as={Link} to="/shop">
              Shop
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              orders
            </Nav.Link>
            
            
          </Nav>

          <Nav className="link2">
          <Nav.Link as={Link} to="/logIn">
              Log In
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

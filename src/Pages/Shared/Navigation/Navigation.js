import React from "react";
import { Container, Navbar,Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../images/favicon.png";
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
          <span className="title" >CHRONO CLICK</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto my-2 my-lg-0 link">
            <Link to="/home"  className="nav_link" >
              Home
            </Link>
            <Link to="/shop" className="nav_link">
              Shop
            </Link>

            <Link  to="/order" className="nav_link">
              Order
            </Link>
          </Nav>
          <Link  to="/login" className="nav_link">
            Sign In
          </Link><br />
          <Link  to="/singin" className="nav_link" >
            Sign Up
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

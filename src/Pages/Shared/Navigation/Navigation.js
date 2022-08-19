import React from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import {  NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/favicon.png";
import "./Navigation.css";

const Navigation = () => {
  const { user, logOut } = useAuth();
  let activeColor = {
    color: "#9c7c38",
  };
  let deActiveColor = {
    color: "#838996",
  };
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
          <span className="title">CHRONO CLICK</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="me-auto ms-5  my-2 my-lg-0 link">
            <NavLink
              to="/home"
              className="nav_link"
              style={({ isActive }) => (isActive ? activeColor : deActiveColor)}
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className="nav_link"
              style={({ isActive }) => (isActive ? activeColor : deActiveColor)}
            >
              Shop
            </NavLink>

            <NavLink
              to="/order"
              className="nav_link"
              style={({ isActive }) => (isActive ? activeColor : deActiveColor)}
            >
              Order
            </NavLink>
          </Nav>
          {user?.email ? (
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={logOut}
              className="nav_link"
            >
              <ion-icon name="person-circle-outline"></ion-icon>
            </Button>
          ) : (
            
            <NavLink
            to="/login" className="nav_link link2"
            style={({ isActive }) => (isActive ? activeColor : deActiveColor)}
          >
            LogIn
          </NavLink>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

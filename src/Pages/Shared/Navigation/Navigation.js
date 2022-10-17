import React from "react";
import { Container, Navbar, Nav, Button, Dropdown, Badge } from "react-bootstrap";
import {  Link, NavLink } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/favicon.png";
import "./Navigation.css";
import { FaShoppingCart } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"

const Navigation = () => {
  const {
    allContexts: { user, logOut },state:{cart},dispatch
  } = useAuth()
  let activeColor = {
    color: "#9c7c38",
  };
  let deActiveColor = {
    color: "#838996",
  };
   const CartTitleStyle = {
     width: 20,
     overflow: "hidden",
     textOverflow: "hidden",
     whiteSpace: "nowrap",
     margin: 10,
   }
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
          <Nav>
            <Dropdown>
              <Dropdown.Toggle variant="dark">
                <FaShoppingCart color="white" fontSize="25px" />
                <Badge variant="dark">{cart.length}</Badge>
              </Dropdown.Toggle>
              <Dropdown.Menu
                align="end"
                style={{
                  minWidth: 370,
                  height: 500,
                  overflow: "scroll",
                  paddingLeft: 30,
                  marginTop: 20,
                }}
              >
                {cart.length > 0 ? (
                  <>
                    {cart.map((product) => (
                      <span className="cartItem">
                        <img className="cartItemImg" src={product.img} alt="" />
                        <div className="cartItemDetails">
                          <span style={CartTitleStyle}>{product.title}</span>
                          <span style={{ margin: 10, color: "green" }}>
                            ${product.price}
                          </span>
                        </div>
                        <AiFillDelete
                          style={{ cursor: "pointer", fontSize: 20 }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: product,
                            })
                          }
                        />
                      </span>
                    ))}
                    <Link to="/order">
                      <button
                        className="bbutton"
                      >
                        Order
                      </button>
                    </Link>
                  </>
                ) : (
                  <span style={{ padding: 10 }}> Cart is Empty</span>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
          {user?.email ? (
            <Button
              style={{ backgroundColor: "transparent", border: "none" }}
              onClick={logOut}
              className="nav_link"
            >
              <ion-icon
                className="profileButton"
                name="person-circle-outline"
              ></ion-icon>
            </Button>
          ) : (
            <NavLink
              to="/login"
              className="nav_link link2"
              style={({ isActive }) => (isActive ? activeColor : deActiveColor)}
            >
              LogIn
            </NavLink>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
};

export default Navigation;

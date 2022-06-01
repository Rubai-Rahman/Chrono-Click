import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LogIn = () => {
  const { user, loginUser } = useAuth();
  const [loginData, setLoginData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newSignupData = { ...loginData };
    newSignupData[field] = value;
    setLoginData(newSignupData);
  };
  const handleSubmit = (e) => {
    loginUser(loginData.email, loginData.password, location, navigate);
    e.preventDefault();
  };

  return (
    <Container className=" SignUpFormContainer">
      <Row>
        <Col>
          <form className="text-center  p-5 SignUpForm " action="#!">
            <p className="h4 mb-4 ">Log In</p>

            <input
              name="email"
              type="email"
              id="defaultLoginFormEmail"
              className=" mb-4"
              placeholder="E-mail"
              onBlur={handleOnChange}
            />

            <input
              label="Password"
              name="password"
              type="password"
              id="defaultLoginFormPassword"
              className=" mb-4"
              placeholder="Password"
              onBlur={handleOnChange}
            />

            <button className="btn  my-2" type="submit" onClick={handleSubmit}>
              Sign Up
            </button>

            <p style={{ color: "#dcdcdc" }}>
              New Member?
              <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;

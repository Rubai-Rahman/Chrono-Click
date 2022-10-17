import React, { useState } from "react";
import "./SignUp.css";
import { Col, Container, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignUp = () =>{
  const { allContexts: { user, registerUser } } = useAuth();
  const [loginData, setLoginData] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  const handleSubmit = (e) => {
    registerUser(loginData.email, loginData.password,loginData.name, location, navigate);
    e.preventDefault();
  };

  return (
    <Container className=" SignUpFormContainer">
      <Row>
        <Col>
          <form className="text-center  p-5 SignUpForm " action="#!">
            <p className="h4 mb-4 ">Sign Up</p>

            <input
              name="name"
              className=" mb-4"
              placeholder="Name"
              onBlur={handleOnChange}
            />
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
              Already have a Account?
              <Link to="/login">Log in</Link>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  )
};

export default SignUp;

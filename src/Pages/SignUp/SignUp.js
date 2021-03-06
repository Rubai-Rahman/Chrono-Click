import React, { useState } from "react";
import "./SignUp.css";
import { Col, Container, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const SignUp = () => {
  const { user,resisterUser } = useAuth();
  const [signupData, setSignupData] = useState({});

  const handleOnChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newSignupData = { ...signupData };
    newSignupData[field] = value;
    setSignupData(newSignupData);
  };
  const handleSubmit = (e) => {
    alert("click");
    resisterUser(signupData.email, signupData.password);
    e.preventDefault();
  };

  return (
    <Container className=" SignUpFormContainer">
      <Row>
        <Col>
          <form className="text-center  p-5 SignUpForm " action="#!">
            <p className="h4 mb-4 ">Sign Up</p>

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
              Already a Member?
              <Link to="/login"> Sign in</Link>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;

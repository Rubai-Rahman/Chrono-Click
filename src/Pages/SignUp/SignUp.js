import React from "react";
import "./SignUp.css";
import { Col, Container, Row } from "react-bootstrap";

const SignUp = () => {
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
            />

            <input
              label="Password"
              name="password"
              type="password"
              id="defaultLoginFormPassword"
              className=" mb-4"
              placeholder="Password"
            />

            <button className="btn  my-2" type="submit">
              Sign Up
            </button>

            <p style={{ color: "#dcdcdc" }}>
              Already a Member?
              <a href="">Sign in</a>
            </p>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;

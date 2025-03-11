import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';

const LogIn = () => {
  const {
    allContexts: { loginUser, googleSignIn },
  } = useAuth();

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
  const handleGoogleSignIn = (e) => {
    googleSignIn(location, navigate);
    e.preventDefault();
  };

  return (
    <Container className="LogInFormContainer">
      <Row className="justify-content-start">
        <Col xs={12} md={6} lg={4}>
          <form className="text-center p-5 LogInForm" action="#!">
            <p className="h4 text-white">Log In</p>

            <input
              name="email"
              type="email"
              id="defaultLoginFormEmail"
              className="mb-4"
              placeholder="E-mail"
              onBlur={handleOnChange}
            />

            <input
              label="Password"
              name="password"
              type="password"
              id="defaultLoginFormPassword"
              className="mb-4"
              placeholder="Password"
              onBlur={handleOnChange}
            />

            <button className="btn my-2" type="submit" onClick={handleSubmit}>
              Log In
            </button>

            <p style={{ color: '#dcdcdc' }}>
              New Member? <Link to="/signup">Sign up</Link>
            </p>
            <button
              className="my-2"
              style={{ backgroundColor: '#AA8B56' }}
              type="submit"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle /> Google SignIn
            </button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default LogIn;

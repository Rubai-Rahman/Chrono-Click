import React from "react";
import { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import "./Newsletter.css";

const Newsletter = () => {
  const [alert, setAlert] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setAlert(true);
    
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    
  };

  return (
    <div className="newsLetter">
      {alert && <Alert variant="primary">Thank You For Subscribe</Alert>}

      <Container>
        <div className="text">
          <h6>SUBSCRIBE TO THE MAILING LIST</h6>
          <h3>Newsletter</h3>
        </div>
        <div className="mail my-5">
          <input type="gmail " placeholder="Your email address" />
          <button onClick={handleSubmit}> SUBMIT</button>
        </div>
      </Container>
    </div>
  );
};

export default Newsletter;

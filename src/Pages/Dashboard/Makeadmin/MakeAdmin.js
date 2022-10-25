import React from "react";
import { useState } from "react";
import { Alert, FloatingLabel, Form } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";

const MakeAdmin = () => {
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState(false);
  const { allContexts: { token } } = useAuth();

  const handleSubmit = (e) => {
    const user = { email };
    fetch("http://localhost:5000/users/admin", {
      method: "PUT",
      headers: {
        'authorization':`Bearer ${token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          setSuccess(true);
          setEmail("");
           
        }
        
      });
    e.preventDefault();
  };
  return (
    <div>
      <h2>Make Admin </h2>
      <form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          onBlur={(e) => setEmail(e.target.value)}
          className="mb-3"
          style={{ marginLeft: 150 }}
        >
          <Form.Control
            type="email"
            placeholder="Add Admin"
            style={{
              width: "35%",
              height: 20,
              marginLeft: 340,
              borderStyle: "solid",
              borderColor: "#9c7c38",
            }}
          />
        </FloatingLabel>
        <br />
        <button
          className="bbutton"
          type="submit"
          style={{
            width: 150,
            backgroundColor: "#9c7c38",
          }}
        >
          Make Admin
        </button>
      </form>
      {success && (
        <Alert  variant="success">
          Made Admin Successfully
        </Alert>
      )}
    </div>
  );
};

export default MakeAdmin;

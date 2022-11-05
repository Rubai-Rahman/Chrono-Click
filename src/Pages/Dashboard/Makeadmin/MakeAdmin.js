import React from "react";
import { useState } from "react";
import { Alert, FloatingLabel, Form } from "react-bootstrap";
import "./MakeAdmin.css";
const MakeAdmin = () => {
  const [email, setEmail] = useState();
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    const user = { email };
    fetch("https://chronoclick.onrender.com/users/admin", {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("idToken")}`,
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
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  };
  return (
    <div>
      <h2>Make Admin </h2>
      <form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          onBlur={(e) => setEmail(e.target.value)}
          className="mb-3 ReviewForm"
        >
          <Form.Control
            type="email"
            placeholder="Add Admin"
            className="formControl"
            style={{
              height: 20,
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
      {success && <Alert variant="success">Made Admin Successfully</Alert>}
    </div>
  );
};

export default MakeAdmin;

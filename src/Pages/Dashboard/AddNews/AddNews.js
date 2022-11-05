import React, { useState } from "react";
import { Alert, FloatingLabel, Form } from "react-bootstrap";

const AddNews = () => {
  const [name, setName] = useState("");

  const [details, setDetails] = useState("");
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: "dcjgjjbi3",
        uploadPreset: "unsignedUpload",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImageUrl(result?.info?.secure_url);
        }
      }
    );
    myWidget.open();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newsData = {
      name,
      details,
      image: imageUrl,
    };
    fetch("https://chronoclick.onrender.com/news", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newsData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess(true);
          setImageUrl("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setTimeout(() => {
      window.location.reload(true);
    }, 1);
  };

  return (
    <div>
      <h2>Add A News</h2>
      <form m className="productForm" onSubmit={handleSubmit}>
        {success && <Alert variant="success">News is Added Successfully</Alert>}
        <FloatingLabel
          controlId="floatingInput"
          onChange={(e) => setName(e.target.value)}
          className="mb-3"
          label="News Title"
        >
          <Form.Control
            type="text"
            required="required"
            placeholder="Add Title"
          />
        </FloatingLabel>
        <br />

        <FloatingLabel
          controlId="floatingInput"
          onChange={(e) => setDetails(e.target.value)}
          className="mb-3"
          label="News Details"
        >
          <Form.Control
            type="text"
            required="required"
            placeholder="Add Details"
          />
        </FloatingLabel>
        <br />

        <p style={{ cursor: "pointer" }} onClick={(e) => handleChange(e)}>
          Upload Image
        </p>
        <br />
        <button className="bbutton">Add News</button>
      </form>
    </div>
  );
};

export default AddNews;

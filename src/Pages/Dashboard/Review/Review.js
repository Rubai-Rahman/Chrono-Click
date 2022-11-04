import React, { useState } from "react";
import { Alert, FloatingLabel, Form } from "react-bootstrap";
import "./Review.css";
import useAuth from "../../../hooks/useAuth";

const Review = () => {
  const {
    allContexts: { user },
  } = useAuth();
  const [review, setReview] = useState("");
  const [success, setSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleChange = (e) => {
    //   const file = e.target.files[0];
    //   setFile(file);
    //   previewFiles(file);
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

    const reviewData = new FormData();
    reviewData.append("name", user?.displayName);
    reviewData.append("review", review);
    reviewData.append("image", imageUrl);
    console.log(reviewData);
    fetch("https://chronoclick.onrender.com/reviews", {
      method: "POST",
      body: reviewData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess(true);
          setImageUrl("");
          setReview("");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div>
      <h2>Add A Review </h2>
      <form onSubmit={handleSubmit}>
        {success && (
          <Alert variant="success">Product is Added Successfully</Alert>
        )}
        <FloatingLabel
          controlId="floatingInput"
          onChange={(e) => setReview(e.target.value)}
          className="mb-3 ReviewForm"
        >
          <Form.Control
            type="text"
            placeholder="Add A Review"
            style={{
              width: "80%",
              height: 200,
              marginLeft: 20,
              borderColor: "#9c7c38",
            }}
          />
        </FloatingLabel>
        <br />
        <p className="uploadImage" onClick={(e) => handleChange(e)}>
          Upload Image
        </p>
        <br />
        <button
          className="bbutton"
          type="submit"
          style={{
            width: 150,
            backgroundColor: "#9c7c38",
          }}
        >
          Add Review
        </button>
      </form>
    </div>
  );
};

export default Review;

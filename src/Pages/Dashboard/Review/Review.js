import React, { useState } from "react"
import { FloatingLabel, Form } from "react-bootstrap"

import useAuth from "../../../hooks/useAuth"

const Review = () => {
  const {
    allContexts: { user },
  } = useAuth()
  const [review, setReview] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()

    const reviewData = new FormData()
    reviewData.append("name", user?.displayName)
    reviewData.append("review", review)
    console.log(reviewData)
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      body: reviewData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess(true)
          
        }
      })
      .catch((error) => {
        console.error("Error:", error)
      })
  }
  return (
    <div>
      <h2>Add A Review </h2>
      <form onSubmit={handleSubmit}>
        <FloatingLabel
          controlId="floatingInput"
          onChange={(e) => setReview(e.target.value)}
          className="mb-3"
          style={{ marginLeft: 150 }}
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
}

export default Review

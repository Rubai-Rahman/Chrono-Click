import React, { useState } from "react";
import { Alert, FloatingLabel, Form } from "react-bootstrap";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
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
    const productData = new FormData();
    productData.append("name", name);
    productData.append("price", price);
    productData.append("details", details);
    productData.append("image", imageUrl);

    fetch("https://chronoclick.onrender.com/products", {
      method: "POST",
      body: productData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess(true);
          setImageUrl();
          setName();
          setPrice();
          setDetails();
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
      <h2>Add A Product</h2>
      <form m className="productForm" onSubmit={handleSubmit}>
        {success && (
          <Alert variant="success">Product is Added Successfully</Alert>
        )}
        <FloatingLabel
          controlId="floatingInput"
          onChange={(e) => setName(e.target.value)}
          className="mb-3 "
          label="Name"
        >
          <Form.Control
            type="text"
            required="required"
            placeholder="Add Name"
          />
        </FloatingLabel>
        <br />
        <FloatingLabel
          controlId="floatingInput"
          onChange={(e) => setPrice(e.target.value)}
          className="mb-3"
          label="Price"
        >
          <Form.Control
            type="text"
            required="required"
            placeholder="Add Price"
          />
        </FloatingLabel>
        <br />
        <FloatingLabel
          controlId="floatingInput"
          onChange={(e) => setDetails(e.target.value)}
          className="mb-3"
          label="Details"
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
        <button className="bbutton">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;

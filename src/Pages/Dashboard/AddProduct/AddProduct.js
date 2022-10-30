import React, { useState } from "react";
import { Alert, FloatingLabel, Form } from "react-bootstrap";
import "./AddProduct.css";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [details, setDetails] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState('');

  const previewFiles = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      console.log(image);
      setImage(reader.result);
    };
  };
  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    previewFiles(file)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!image) {
      return;
    }
    const productData = new FormData();
    productData.append("name", name);
    productData.append("price", price);
    productData.append("details", details);
    productData.append("image", image);

    fetch("https://chronoclick.onrender.com/products", {
      method: "POST",
      body: productData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
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
          className="mb-3"
          label="Name"
        >
          <Form.Control type="text" placeholder="Add Name" />
        </FloatingLabel>
        <br />
        <FloatingLabel
          controlId="floatingInput"
          onChange={(e) => setPrice(e.target.value)}
          className="mb-3"
          label="Price"
        >
          <Form.Control type="text" placeholder="Add Price" />
        </FloatingLabel>
        <br />
        <FloatingLabel
          controlId="floatingInput"
          onChange={(e) => setDetails(e.target.value)}
          className="mb-3"
          label="Details"
        >
          <Form.Control type="text" placeholder="Add Details" />
        </FloatingLabel>
        <br />

        <input
          accept="image/*"
          type="file"
          onChange={e=>handleChange(e)}
        />
        <br />
        <button className="bbutton">Add Product</button>
      </form>
      <img src={image} alt="" />
    </div>
  );
};

export default AddProduct;

import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [proDetails, setProDetails] = useState({});
  useEffect(() => {
    const url = `https://cryptic-shore-01306.herokuapp.com/products/${productId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProDetails(data));
  }, []);
  return (
    <Col>
    <Card className="product shadow-lg p-3 mb-5  rounded product-details">
      <Card.Img variant="top" src={proDetails.img} />
      <Card.Body>
        <Card.Title className="Card-title">{proDetails.name}</Card.Title>
        <Card.Text>
          price: $:{proDetails.price} <br />
       
          Details: {proDetails.details} <br />
          <div className="button">
            
            <button className="bbutton">Add to Cart</button>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
  );
};

export default ProductDetails;

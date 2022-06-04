import React, { useEffect, useState } from "react";
import { Card, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  const [proDetails, setProDetails] = useState({});
  useEffect(() => {
    const url = `http://localhost:5000/products/${productId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProDetails(data));
  }, []);
  return (
    <Col>
    <Card className="product shadow-lg p-3 mb-5  rounded">
      <Card.Img variant="top" src={proDetails.img} />
      <Card.Body>
        <Card.Title className="Card-title">{proDetails.name}</Card.Title>
        <Card.Text>
          price: $:{proDetails.price} <br />
          
        </Card.Text>
      </Card.Body>
    </Card>
  </Col>
  );
};

export default ProductDetails;

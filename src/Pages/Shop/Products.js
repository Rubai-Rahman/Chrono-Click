import { Button } from "bootstrap";
import React from "react";
import { Col, Card } from "react-bootstrap";

const Products = ({ product }) => {
  const { name, price, img } = product;

  return (
    <Col>
      <Card className="product shadow-lg p-3 mb-5  rounded">
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>$:{price}</Card.Text>
          <button>Buy Now</button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;

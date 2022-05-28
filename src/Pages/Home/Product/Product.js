import React from "react";
import { CardGroup, Row, Col, Card } from "react-bootstrap";
import './Product.css';

const Product = ({ product }) => {
  const { name, price, img } = product;

  return (
    <Col>
      <Card className="card shadow-lg p-3 mb-5  rounded" >
        <Card.Img variant="top"  src={img} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>$:{price}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;

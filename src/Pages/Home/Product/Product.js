import React from "react";
import { Col, Card } from "react-bootstrap";
import "./Product.css";

const Product = ({ product }) => {
  const { id, name, price, img } = product;

  return (
    <Col>
      <Card className="product shadow-lg p-3 mb-5  rounded">
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title className="Card-title">{name}</Card.Title>
          <Card.Text>
            price: $:{price} <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Product;

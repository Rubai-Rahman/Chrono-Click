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
          <Card.Title className="Card-title">{name}</Card.Title>
          <Card.Text>
            price: $:{price} <br />
            <div className="button">
            <button className="bbutton">Details</button>
            <button className="bbutton">Add to Cart</button>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;

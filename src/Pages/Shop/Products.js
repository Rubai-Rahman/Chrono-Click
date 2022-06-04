import React from "react";
import { Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Products = ({ product }) => {
  const { _id, name, price, img } = product;
  const url = `/products/${_id}`;
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate(url);
  };

  return (
    <Col>
      <Card className="product shadow-lg p-3 mb-5  rounded">
        <Card.Img variant="top" src={img} />
        <Card.Body>
          <Card.Title className="Card-title">{name}</Card.Title>
          <Card.Text>
            price: $:{price} <br />
            <div className="button">
              <button onClick={handleDetails} className="bbutton">
                Details
              </button>
              <button className="bbutton">Add to Cart</button>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;

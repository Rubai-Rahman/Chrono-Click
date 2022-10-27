import React from "react";
import { Col, Card } from "react-bootstrap";
const DeleteProduct = ({ product }) => {
  const { _id, name, price, img } = product;

  const handleDelete = (id) => {
    fetch(`https://chronoclick.onrender.com/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          alert("Deleted");
        }
      });
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
              <button onClick={() => handleDelete(_id)} className="bbutton">
                Delete
              </button>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default DeleteProduct;

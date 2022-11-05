import React from "react";
import { Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Products = ({ product }) => {
  const { _id, name, price, img } = product;
  const url = `/products/${_id}`;
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate(url);
  };
  const {
    state: { cart },
    dispatch,
  } = useAuth();
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

              {cart.some((p) => p._id === product._id) ? (
                <button
                  className="bbutton"
                  style={{ color: "white" }}
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: product,
                    });
                  }}
                >
                  Remove
                </button>
              ) : (
                <button
                  className="bbutton"
                  onClick={() => {
                    dispatch({
                      type: "ADD_TO_CART",
                      payload: product,
                    });
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;

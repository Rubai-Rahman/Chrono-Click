import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./ProductDetails.css";

const ProductDetails = () => {
  const { productId } = useParams();
  const [proDetails, setProDetails] = useState({});
  const {
    state: { cart },
    dispatch,
  } = useAuth();
  
  useEffect(() => {
    const url = `https://chronoclick.onrender.com/products/${productId}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProDetails(data));
  }, [productId]);
  return (
    <Container className="navSetup">
      <Row>
        <Col>
          <Card className="product shadow-lg p-3 mb-5  rounded product-details">
            <Card.Img variant="top" src={proDetails.img} />
          </Card>
        </Col>
        <Col>
          <Card.Text className=" shadow-lg mx-5 p-2">
            <Card.Title className="Card-title my-5">
              {proDetails.name}
            </Card.Title>
            <Card.Body className="my-2 ">
              <p>
                price: $:{proDetails.price} <br />
              </p>
              <p className="text-start">
                Details:{proDetails.details} <br />
              </p>
            </Card.Body>

            <div className="button">
              {cart.some((p) => p._id === proDetails._id) ? (
                <button
                  className="bbutton"
                  style={{ color: "white" }}
                  onClick={() => {
                    dispatch({
                      type: "REMOVE_FROM_CART",
                      payload: proDetails,
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
                      payload: proDetails,
                    });
                  }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </Card.Text>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;

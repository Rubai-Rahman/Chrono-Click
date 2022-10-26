import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";

const MyOrders = () => {
  const {
    allContexts: {
      user: { email },
    },
  } = useAuth();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5000/orders/${email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, [email]);

  const cart = order.map((product) => product.cart);

  return (
    <Container style={{ marginTop: 70 }}>
      <div>
        <ListGroup>
          {cart.map((product) =>
            product.map((cart) => (
              <ListGroupItem>
                <Row>
                  <Col>
                    <img
                      src={cart.img}
                      style={{ width: 50, height: 50 }}
                      alt="pImage"
                    />
                  </Col>
                  <Col>{cart.name}</Col>
                  <Col>{cart.price}</Col>
                  <Col>
                    {" "}
                    <AiFillDelete
                      style={{ cursor: "pointer", fontSize: 20 }}
                     
                    />
                  </Col>
                  <Col>
                    {" "}
                    <AiFillDelete
                      style={{ cursor: "pointer", fontSize: 20 }}
                      
                    />
                  </Col>
                </Row>
              </ListGroupItem>
            ))
          )}
        </ListGroup>
      </div>
    </Container>
  );
};

export default MyOrders;

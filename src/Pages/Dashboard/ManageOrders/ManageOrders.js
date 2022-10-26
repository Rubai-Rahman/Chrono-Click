import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";

const ManageOrders = () => {
  const {
    allContexts: {
      user: { email },
    },
  } = useAuth();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    const url = `http://localhost:5000/orders`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);

  const handleDelete = id => {
    const url = `http://localhost:5000/orders/${id}`;
    fetch(url, {
      method:'DELETE'
    })
      .then(res => res.json())
      .then(data => {
        if (data.deleteCount) {
          alert('deleted')
          const remaining = cart.filter(product => product.id != id);
          setOrder(remaining)
      }
    })
  }
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
                      onClick={handleDelete}
                    />
                  </Col>
                  <Col>
                    {" "}
                    <AiFillDelete
                      style={{ cursor: "pointer", fontSize: 20 }}
                      onClick=""
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

export default ManageOrders;

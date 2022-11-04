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
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const url = `https://chronoclick.onrender.com/orders/${email}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCart(data.map((product) => product.cart));
      });
  }, [email]);

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          alert("All The Item of This Cart is Deleted ");
          const remaining = cart.filter((product) => product.id !== id);
          setCart(remaining);
        }
      });
  };

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
                      onClick={() => handleDelete(cart._id)}
                    />
                  </Col>
                  <Col>
                    <button> {cart.status}</button>
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

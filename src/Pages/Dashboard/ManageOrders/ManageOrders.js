import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row, Spinner } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import useAuth from "../../../hooks/useAuth";

const ManageOrders = () => {
  const {
    allContexts: {
      user: { email },
    },
  } = useAuth();
  const [cart, setCart] = useState([]);
   const [loading, setIsLoading] = useState(false);
  useEffect(() => {
    const url = `https://chronoclick.onrender.com/orders`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCart(data.map((product) => product.cart));
      });
  }, []);

  //const cart = order.map((product) => product.cart);
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/orders/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          alert("All The Item of This Cart is Deleted ");
          setIsLoading(true)
          const remaining = cart.filter((product) => product.id !== id);
          setCart(remaining);
          setIsLoading(false)
        }
      });
  };
  return (
    <Container style={{ marginTop: 70 }}>
      {loading && <Spinner animation="grow" />}
      {loading && <Spinner animation="grow" />}
      {loading && <Spinner animation="grow" />}
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

export default ManageOrders;

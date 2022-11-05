import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

const ManageOrders = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const url = `https://chronoclick.onrender.com/orders`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCart(data.map((product) => product.cart));
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`https://chronoclick.onrender.com/orders/${id}`, {
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

export default ManageOrders;

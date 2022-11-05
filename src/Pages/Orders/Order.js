import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import useAuth from "../../hooks/useAuth";
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

const Order = () => {
  const {
    allContexts: { user },
    state: { cart },
    dispatch,
  } = useAuth();
  const navigate = useNavigate();
  const [total, setTotal] = useState();
  const [success, setSuccess] = useState(false);
  const email = user.email;
  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price * curr.qty), 0)
    );
  }, [cart]);

  // send item to db
  const handleOrder = (e) => {
    //make data for send
    const orderData = {
      email,
      cart,
    };

    fetch(`https://chronoclick.onrender.com/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          setSuccess(true);
        }
      });

    // //Clear Cart
    dispatch({
      type: "ClEAR_CART",
    });
    navigate("/payment");
    e.preventDefault();
  };

  return (
    <Container style={{ marginTop: 70 }}>
      <div>
        <ListGroup>
          {cart.map((product) => (
            <ListGroupItem>
              <Row>
                <Col>
                  <img
                    src={product.img}
                    style={{ width: 50, height: 50 }}
                    alt="pImage"
                  />
                </Col>
                <Col>{product.name}</Col>
                <Col>{product.price * product.qty}</Col>
                <Col className="increaseDecrease">
                  <button
                    style={{ backgroundColor: "white" }}
                    onClick={() =>
                      dispatch({
                        type: "INCREASE_CART_QTY",
                        payload: {
                          _id: product._id,
                          qty: product.qty,
                        },
                      })
                    }
                  >
                    <AiOutlinePlus />
                  </button>
                  <button style={{ backgroundColor: "white" }}>
                    {product.qty}
                  </button>
                  <button
                    style={{ backgroundColor: "white" }}
                    onClick={() =>
                      dispatch({
                        type: "DECREASE_CART_QTY",
                        payload: {
                          _id: product._id,
                          qty: product.qty,
                        },
                      })
                    }
                  >
                    <AiOutlineMinus />
                  </button>
                </Col>
                <Col>
                  {" "}
                  <AiFillDelete
                    style={{ cursor: "pointer", fontSize: 20 }}
                    onClick={() =>
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: product,
                      })
                    }
                  />
                </Col>
              </Row>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      <div className="filtersSummary ">
        <span className="title">Subtotal ({cart.length}) items</span>
        <span className="title"> Total: $ {total} </span>
        <Link to="">
          <button onClick={handleOrder} className="bbutton">
            Check Out
          </button>
        </Link>
      </div>
    </Container>
  );
};

export default Order;

import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap"
import useAuth from "../../hooks/useAuth"
import { AiFillDelete, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai"

const Order = () => {
  const {
    state: { cart },
    dispatch,
  } = useAuth()
  const [total, setTotal] = useState()

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price*curr.qty), 0))
  }, [cart])
 
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
                  <button>{product.qty}</button>
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
        <button className="bbutton">Check Out</button>
      </div>
    </Container>
  )
}

export default Order

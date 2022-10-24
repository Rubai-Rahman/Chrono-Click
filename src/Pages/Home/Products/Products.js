import React from "react"
import { Row, Spinner } from "react-bootstrap"
import "./Products.css"
import Product from "../Product/Product"
import { Link } from "react-router-dom"
import useProducts from "../../../hooks/useProducts"

const Products = () => {
  const [products,setProducts] = useProducts()
  let random = products.sort(() => 0.5 - Math.random()).slice(0, 6)

  return (
    <>
      <div style={{ margin: 100 }}>
        <h4>LATEST WATCHES YOU CAN'T RESIST!</h4>
        <h2>Universal Timekeepers of the world</h2>
        
      </div>
      <div className="products-container">
        <>
          <Row xs={1} md={2} lg={3} className="g-2 ">
            {random.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </Row>
        </>
        <div className="explore">
          <button>
            <Link to="/shop" className="nave_btn">
              Explore
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Products

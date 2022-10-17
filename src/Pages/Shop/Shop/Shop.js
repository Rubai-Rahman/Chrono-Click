import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Products from "./Products";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [cart, setCart] = useState([]);

  const size = 12;
  useEffect(() => {
    fetch(
      `https://cryptic-shore-01306.herokuapp.com/products?page=${page}&&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      });
  }, [page]);

  
 
  return (
    <>
      <div style={{ margin: 100 }}>
        <h4>LATEST WATCHES YOU CAN'T RESIST!</h4>
        <h2>Find Your Watch </h2>
      </div>
      <div className="products-container">
        <Row xs={1} md={2} lg={3} className="g-2 ">
          {products.map((product) => (
            <Products
              key={product._id}
              product={product}
             
            />
          ))}
        </Row>
      </div>

      <div className="pagination">
        {[...Array(pageCount).keys()].map((number) => (
          <button
            className={number === page ? "selected" : ""}
            key={number}
            onClick={() => setPage(number)}
          >
            {number + 1}
          </button>
        ))}
      </div>
    </>
  );
};

export default Shop;

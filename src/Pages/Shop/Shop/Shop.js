import React, { useEffect, useState } from "react";
import { Row, Spinner } from "react-bootstrap";
import Products from "./Products";
import "./Shop.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setIsLoading] = useState(true);

  const size = 12;
  useEffect(() => {
    fetch(
      `https://chronoclick.onrender.com/products?page=${page}&&size=${size}`
    )
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
        const count = data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
        setIsLoading(false);
      });
  }, [page]);

  return (
    <>
      <div className="header">
        <h4>LATEST WATCHES YOU CAN'T RESIST!</h4>
        <h2>Find Your Watch </h2>
        {loading && <Spinner animation="grow" />}
        {loading && <Spinner animation="grow" />}
        {loading && <Spinner animation="grow" />}
      </div>
      <div className="products-container">
        <Row xs={1} md={2} lg={3} className="g-2 ">
          {products.map((product) => (
            <Products key={product._id} product={product} />
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

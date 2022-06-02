import React from "react";
import { Row } from "react-bootstrap";
import useProducts from "../../hooks/useProducts";
import Products from "./Products";

const Shop = () => {
  const [products, setProducts] = useProducts();
  console.log(products);
  return (
    <>
      <div style={{ margin: 100 }}>
        <h4>LATEST WATCHES YOU CAN'T RESIST!</h4>
        <h2>Find Your Watch </h2>
      </div>
      <div className="products-container">
        <Row xs={1} md={2} lg={3} className="g-2 ">
          {products.map((product) => (
            <Products key={product._id} product={product} />
          ))}
        </Row>
      </div>
    </>
  );
};

export default Shop;

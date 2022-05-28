import React, { useEffect, useState } from "react";
import { Row} from "react-bootstrap";
import './Products.css';
import Product from "../Product/Product";
import img1 from "../../../images/watch/01.webp";
import img2 from "../../../images/watch/02.webp";
import img3 from "../../../images/watch/03.webp";
import img4 from "../../../images/watch/04.webp";

const products = [
  {
    id: 1,
    name: "Platinum 3 In 1 Classic Analog",
    price: "250",
    img: img1,
  },
  {
    id: 2,
    name: "Platinum 3 In 1 Classic Analog",
    price: "350",
    img: img2,
  },
  {
    id: 3,
    name: "Golden Black Analog Automatic",
    price: "200",
    img: img3,
  },
  {
    id: 4,
    name: "Golden Analog Watch",
    price: "150",
    img: img4,
  },
  {
    id: 4,
    name: "Golden Analog Watch",
    price: "150",
    img: img4,
  },
  {
    id: 4,
    name: "Golden Analog Watch",
    price: "150",
    img: img4,
  },
];
const Products = () => {
  return (
    <>
      <div style={{margin:100}}>
        <h4>LATEST WATCHES YOU CAN'T RESIST!</h4>
        <h2>Universal Timekeepers of the world</h2>
      </div>
      <div className="products-container">
      <Row xs={1} md={2} lg={3} className="g-2 ">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
        </Row>
      </div>
    </>
  );
};

export default Products;

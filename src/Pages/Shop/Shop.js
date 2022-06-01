import React from "react";
import { Row } from "react-bootstrap";

import img1 from "../../images/watch/01.webp";
import img2 from "../../images/watch/02.webp";
import img3 from "../../images/watch/03.webp";
import img4 from "../../images/watch/04.webp";
import img5 from "../../images/watch/5.webp";
import img6 from "../../images/watch/06.webp";
import img7 from "../../images/watch/07.webp";
import img8 from "../../images/watch/08.webp";
import img9 from "../../images/watch/09.webp";
import img10 from "../../images/watch/10.webp";
import img11 from "../../images/watch/11.webp";
import img12 from "../../images/watch/12.webp";
import img13 from "../../images/watch/13.webp";
import img14 from "../../images/watch/14.webp";
import img15 from "../../images/watch/15.webp";
import img16 from "../../images/watch/16.webp";
import img17 from "../../images/watch/17.webp";
import img18 from "../../images/watch/18.webp";
import img19 from "../../images/watch/03.webp";
import img20 from "../../images/watch/02.webp";

import { Link } from "react-router-dom";
import Products from "./Products";

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
    id: 5,
    name: "Golden Analog Watch",
    price: "150",
    img: img5,
  },
  {
    id: 6,
    name: "Golden Analog Watch",
    price: "150",
    img: img6,
  },
  
  {
    id: 7,
    name: "Platinum 3 In 1 Classic Analog",
    price: "250",
    img: img7,
  },
  {
    id: 8,
    name: "Platinum 3 In 1 Classic Analog",
    price: "350",
    img: img8,
  },
  {
    id: 9,
    name: "Golden Black Analog Automatic",
    price: "200",
    img: img9,
  },
  {
    id: 10,
    name: "Golden Analog Watch",
    price: "150",
    img: img10,
  },
  {
    id: 11,
    name: "Golden Analog Watch",
    price: "150",
    img: img11,
  },
  {
    id: 12,
    name: "Golden Analog Watch",
    price: "150",
    img: img12,
  },
  {
    id: 13,
    name: "Platinum 3 In 1 Classic Analog",
    price: "250",
    img: img13,
  },
  {
    id: 14,
    name: "Platinum 3 In 1 Classic Analog",
    price: "350",
    img: img14,
  },
  {
    id: 15,
    name: "Golden Black Analog Automatic",
    price: "200",
    img: img15,
  },
  {
    id: 16,
    name: "Golden Analog Watch",
    price: "150",
    img: img16,
  },
  {
    id: 17,
    name: "Golden Analog Watch",
    price: "150",
    img: img17,
  },
  {
    id: 18,
    name: "Golden Analog Watch",
    price: "150",
    img: img18,
  },
  {
    id: 19,
    name: "Golden Analog Watch",
    price: "150",
    img: img19,
  },
  {
    id: 20,
    name: "Golden Analog Watch",
    price: "150",
    img: img20,
  },
];

const Shop = () => {
  return (
    <>
      <div style={{ margin: 100 }}>
        <h4>LATEST WATCHES YOU CAN'T RESIST!</h4>
        <h2>Universal Timekeepers of the world</h2>
      </div>
      <div className="products-container">
        <Row xs={1} md={2} lg={3} className="g-2 ">
          {products.map((product) => (
            <Products key={product.id} product={product} />
          ))}
        </Row>
        
      </div>
    </>
  );
};

export default Shop;

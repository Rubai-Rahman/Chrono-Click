import React from "react";
import "./Slider.css";
import { Carousel } from "react-bootstrap";
import slider1 from "../../../images/slider/slider1-bg.webp";
import slider2 from "../../../images/slider/slider2-bg.webp";
import slider3 from "../../../images/slider/slider3-bg.webp";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100 letSee"
            src={slider1}
            alt="First slide"
          />
          <Carousel.Caption className="caption caption1">
            <h3>PREMIUM MODEL</h3>
            <p>Stylish external wrist watch</p>
            <button>
              <Link to="/shop" className="nav_btn">
                Explore
              </Link>
            </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 letSee"
            src={slider2}
            alt="Second slide"
          />

          <Carousel.Caption className="caption caption2">
            <h3>FALL IN LOVE</h3>
            <p>Redefining the meaning of time</p>
            <button>
              <Link to="/shop" className="nav_btn">
                Explore
              </Link>
            </button>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 letSee"
            src={slider3}
            alt="Third slide"
          />

          <Carousel.Caption className="caption caption2">
            <h3>SECRET NEW MODELS</h3>
            <p>Priceless and timeless designs</p>
            <button>
              <Link to="/shop" className="nav_btn">
                Explore
              </Link>
            </button>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  );
};

export default Slider;

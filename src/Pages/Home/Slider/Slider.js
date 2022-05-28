import React from "react";
import { Carousel } from "react-bootstrap";
import slider1 from "../../../images/slider/slider1-bg.webp";
import slider2 from "../../../images/slider/slider2-bg.webp";
import slider3 from "../../../images/slider/slider3-bg.webp";

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img className="d-block w-100" src={slider1} alt="First slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img className="d-block w-100" src={slider2} alt="Second slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src={slider3} alt="Third slide" />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;

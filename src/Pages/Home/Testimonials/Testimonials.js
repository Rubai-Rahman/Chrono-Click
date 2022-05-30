import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Testimonials.css'

import img1 from "../../../images/review/blog-02.webp";
import img2 from "../../../images/review/blog-04.webp";
import img3 from "../../../images/review/blog-07.webp";
import img4 from "../../../images/review/blog-10.webp";

import Slider from "react-slick/lib/slider";
import { Link } from "react-router-dom";

const story = [
  {
    id: 1,
    img: img1,
    title: "Gentlemen prefer Chrono Click!",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, quod facere. Vitae quis ipsa molestias repellat non eligendi tempore ",
  },
  {
    id: 2,
    img: img2,
    title: "The future perfect watches!",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, quod facere. Vitae quis ipsa molestias repellat non eligendi tempore ",
  },
  {
    id: 3,
    img: img3,
    title: "The elegance of a wrist Watch",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, quod facere. Vitae quis ipsa molestias repellat non eligendi tempore ",
  },
  {
    id: 4,
    img: img4,
    title: "Your constant companion",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, quod facere. Vitae quis ipsa molestias repellat non eligendi tempore ",
  },
  
];
const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 828,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 740,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="testimonials " style={{ marginTop: 100 }}>
     
      <h2>Testimonials</h2>
      <Slider {...settings}>
        {story.map((item) => (
          <div className="testcard">
            <div className="testcard-top">
              <img key={item.img} src={item.img} alt="img" />
              <h1 key={item.title}>{item.title}</h1>
            </div>
            <div className="testcard-bottom">
              <p key={item.id}>{item.story}</p>
              
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;

import React, { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Testimonials.css";

import Slider from "react-slick/lib/slider";
import { useState } from "react";


const Testimonials = () => {
  const [story, setStory] = useState([]);

  useEffect(() => {
    fetch(`https://chronoclick.onrender.com/review`)
      .then((res) => res.json())
      .then((data) => {
        setStory(data);
      });
  }, []);
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
      <h2>Testimonials </h2>
      <Slider {...settings}>
        {story.map((item) => (
          <div className="testcard">
            <div className="testcard-top">
              <img key={item.id} src={item.img} alt="img" />
              <h1 key={item.name}>{item.name}</h1>
            </div>
            <div className="testcard-bottom">
              <p key={item.comment}>{item.comment}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testimonials;

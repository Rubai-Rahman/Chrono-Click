import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./News.css";
import Slider from "react-slick/lib/slider";
import { Link } from "react-router-dom";

const News = () => {
  const [story, setStory] = useState([]);

  useEffect(() => {
    fetch(`https://chronoclick.onrender.com/news`)
      .then((res) => res.json())
      .then((data) => {
        setStory(data);
      });
  }, [story]);

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
    <div className="news " style={{ marginTop: 100 }}>
      <h2>TIME IS PRECIOUS ... CHECK OUT NOW</h2>
      <h1>Latest News</h1>
      <Slider {...settings}>
        {story.map((item) => (
          <div className="news-card card">
            <div className="news-card-top card-top">
              <img key={item.img} src={item.img} alt="img" />
              <h1 key={item.name}>{item.name}</h1>
            </div>
            <div className="news-card-bottom card-bottom">
              <p key={item.details}>{item.details}</p>
              <Link
                to="/"
                style={{ color: "silver", fontSize: 15, letterSpacing: 3 }}
              >
                READ MORE{" "}
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default News;

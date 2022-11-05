import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./News.css";
import Slider from "react-slick/lib/slider";
import NewsItem from "./NewsItem";

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
            <NewsItem key={item._id} item={item} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default News;

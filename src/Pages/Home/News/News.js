import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./News.css";
import img1 from "../../../images/News/blog9.webp";
import img2 from "../../../images/News/blog8.webp";
import img3 from "../../../images/News/blog7.webp";
import img4 from "../../../images/News/blog10.webp";
import img5 from "../../../images/News/blog12.webp";
import img6 from "../../../images/News/blog11.webp";
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
    id: 1,
    img: img2,
    title: "Gentlemen prefer Chrono Click!",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, quod facere. Vitae quis ipsa molestias repellat non eligendi tempore ",
  },
  {
    id: 1,
    img: img3,
    title: "Gentlemen prefer Chrono Click!",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, quod facere. Vitae quis ipsa molestias repellat non eligendi tempore ",
  },
  {
    id: 1,
    img: img4,
    title: "Gentlemen prefer Chrono Click!",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, quod facere. Vitae quis ipsa molestias repellat non eligendi tempore ",
  },
  {
    id: 1,
    img: img5,
    title: "Gentlemen prefer Chrono Click!",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, quod facere. Vitae quis ipsa molestias repellat non eligendi tempore ",
  },
  {
    id: 1,
    img: img6,
    title: "Gentlemen prefer Chrono Click!",
    story:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, quod facere. Vitae quis ipsa molestias repellat non eligendi tempore ",
  },
];

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const News = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,

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
          <div className="card">
            <div className="card-top">
              <img src={item.img} alt="img" />
              <h1>{item.title}</h1>
            </div>
            <div className="card-bottom">
              <p>{item.story}</p>
			  <Link to="/" style={{color:'silver', fontSize:15,letterSpacing:3}}>READ MORE </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default News;

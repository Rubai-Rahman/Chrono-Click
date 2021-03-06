import React from "react";

import Banner from "../Banner/Banner";

import News from "../News/News";
import Newsletter from "../Newsletter/Newsletter";
import Products from "../Products/Products";

import Slider from "../Slider/Slider";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
      <Slider />
      <Products />
      <Banner />
      <Testimonials />
      <News />
      <Newsletter />
    </div>
  );
};

export default Home;

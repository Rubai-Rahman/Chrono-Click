import React from "react";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import News from "../News/News";
import Products from "../Products/Products";


import Slider from "../Slider/Slider";
import Testimonials from "../Testimonials/Testimonials";

const Home = () => {
  return (
    <div>
        
      <Slider />
     <Products/>
     <Banner/>
     <Testimonials/>
     <News/>
     <Footer/>

    </div>
  );
};

export default Home;

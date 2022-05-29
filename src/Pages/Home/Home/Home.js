import React from "react";
import News from "../News/News";
import Products from "../Products/Products";


import Slider from "../Slider/Slider";

const Home = () => {
  return (
    <div>
        
      <Slider />
     <Products/>
     <News/>

    </div>
  );
};

export default Home;

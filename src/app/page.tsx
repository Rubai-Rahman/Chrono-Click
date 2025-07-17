import React from "react";
import Slider from "@/components/main/home/Slider";
import Products from "@/components/main/home/Products";
import Banner from "@/components/main/home/Banner";
import Testimonials from "@/components/main/home/Testimonials";
import News from "@/components/main/home/News";
import Newsletter from "@/components/main/home/Newsletter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Chrono Click - Home",
  description: "Your ultimate destination for stylish watches and accessories.",
};

const HomePage = () => {
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

export default HomePage;
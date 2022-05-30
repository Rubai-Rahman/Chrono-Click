import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner">
      <div className="dialog my-4">
        <h3>Chrono Click ... Time Is Ticking Away!</h3>
        <h5>DECIDE NOW TO UPDATE</h5>
      </div>
      <div className="media">
        <ion-icon name="play-circle"></ion-icon>
      </div>
    </div>
  );
};

export default Banner;

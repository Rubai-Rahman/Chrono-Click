'use client'
import React, { useState } from "react";
import { PlayCircle, X } from "lucide-react";

const Banner = () => {
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };

  return (
    <div className="relative bg-gray-800 text-white py-16 px-4 text-center">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold mb-2">Chrono Click ... Time Is Ticking Away!</h3>
        <h5 className="text-xl mb-6">DECIDE NOW TO UPDATE</h5>
        <button className="bg-transparent border-none text-white text-5xl cursor-pointer" onClick={openModal}>
          <PlayCircle size={64} />
        </button>
      </div>

      {show && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-black p-4 rounded-lg relative">
            <button
              className="absolute top-2 right-2 bg-transparent border-none text-yellow-600 text-5xl cursor-pointer"
              onClick={closeModal}
            >
              <X size={32} />
            </button>
            <iframe
              width="560"
              height="315"
              src="https://www.youtube.com/embed/p0ZHRJ0xcd8"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;
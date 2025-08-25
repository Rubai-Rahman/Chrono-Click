'use client';
import React, { useState } from 'react';
import { PlayCircle, X } from 'lucide-react';
import Container from '@/components/layout/container';

const Banner = () => {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <div className="relative bg-[url('/banner.webp')] bg-no-repeat bg-cover bg-blend-darken flex flex-col items-center justify-center text-primary-foreground text-center  h-[400px] sm:h-[300px] md:h-[500px]  px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold mb-2">
            Chrono Click ... Time Is Ticking Away!
          </h3>
          <h5 className=" mb-6">DECIDE NOW TO UPDATE</h5>
          <button
            className="bg-transparent border-none text-white text-5xl cursor-pointer"
            onClick={() => setShow(true)}
          >
            <PlayCircle size={64} />
          </button>
        </div>

        {show && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-black p-4 rounded-lg relative">
              <button
                className="absolute top-2 right-2 bg-transparent border-none text-yellow-600 text-5xl cursor-pointer"
                onClick={() => setShow(false)}
              >
                <X size={32} />
              </button>
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/efqKWzXIqEI?si=0GZQJs04eopvjOUI"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Banner;

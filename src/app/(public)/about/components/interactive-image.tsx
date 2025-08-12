'use client';

import Image from 'next/image';

interface InteractiveImageProps {
  src: string;
  alt: string;
  overlayText: string;
}

const InteractiveImage = ({ src, alt, overlayText }: InteractiveImageProps) => {
  return (
    <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl border border-border group">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
        <span className="text-white text-sm font-medium">{overlayText}</span>
      </div>
    </div>
  );
};

export default InteractiveImage;

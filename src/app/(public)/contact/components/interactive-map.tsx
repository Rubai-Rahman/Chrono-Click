'use client';

import Image from 'next/image';

const InteractiveMap = () => {
  return (
    <div className="mt-8 rounded-xl overflow-hidden shadow-lg border border-border group">
      <Image
        src="/placeholder.svg?height=300&width=600"
        alt="Location Map"
        width={600}
        height={300}
        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
};

export default InteractiveMap;

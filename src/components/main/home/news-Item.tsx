import React from "react";
import Link from "next/link";
import Image from "next/image";

interface NewsItemProps {
  item: {
    _id: string;
    name: string;
    details: string;
    img: string;
  };
}

const NewsItem: React.FC<NewsItemProps> = ({ item }) => {
  const { _id, name, details, img } = item;
  const url = `/news/${_id}`;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative h-48 w-full">
        <Image src={img} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <h1 className="text-xl font-semibold mb-2">{name}</h1>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">{details}</p>
        <Link
          href={url}
          className="text-gray-500 hover:text-gray-700 text-sm tracking-widest uppercase"
        >
          READ MORE
        </Link>
      </div>
    </div>
  );
};

export default NewsItem;

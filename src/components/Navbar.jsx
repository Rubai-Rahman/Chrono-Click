import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/favicon.png';
import { ShoppingCart } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="home" className="flex items-center space-x-2">
          <Image
            alt="logo"
            src={logo}
            width={30}
            height={30}
            className="inline-block align-top"
          />
          <span className="text-yellow-600 text-xl font-bold">
            CHRONO CLICK
          </span>
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/home"
            className="text-gray-400 hover:text-yellow-600 font-bold"
          >
            HOME
          </Link>
          <Link
            href="/shop"
            className="text-gray-400 hover:text-yellow-600 font-bold"
          >
            SHOP
          </Link>
          <Link
            href="/order"
            className="text-gray-400 hover:text-yellow-600 font-bold"
          >
            Order
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          {/* Cart Dropdown - needs Shadcn UI implementation */}
          <div className="relative">
            <button className="text-white focus:outline-none">
              <ShoppingCart className="h-5 w-5" />
            </button>
          </div>

          <Link
            href="/login"
            className="text-gray-400 hover:text-yellow-600 font-bold"
          >
            LogIn
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

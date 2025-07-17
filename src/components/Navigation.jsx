'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/favicon.png'; // Assuming favicon.png is in public folder
import { ShoppingCart } from 'lucide-react';

const Navigation = () => {
  // TODO: Integrate with chrono-click-next's authentication and cart context
  // const {
  //   allContexts: { user, logOut },
  //   state: { cart },
  //   dispatch,
  // } = useAuth();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="#home" className="flex items-center space-x-2">
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
          {/* Dashboard link - to be uncommented when auth is integrated */}
          {/* {user.email ? (
            <Link
              href="/dashboard"
              className="text-gray-400 hover:text-yellow-600 font-bold"
            >
              DASHBOARD
            </Link>
          ) : (
            ""
          )} */}
        </div>
        <div className="flex items-center space-x-4">
          {/* Cart Dropdown - needs Shadcn UI implementation */}
          <div className="relative">
            <button className="text-white focus:outline-none">
              <ShoppingCart className="h-5 w-5" />
              {/* Cart length badge - to be uncommented when cart is integrated */}
              {/* <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">{cart.length}</span> */}
            </button>
            {/* Dropdown content - needs Shadcn UI implementation */}
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg py-2 z-10">
              <span className="block px-4 py-2 text-gray-800">
                Cart is Empty (Functionality to be implemented)
              </span>
            </div>
          </div>
          {/* Login/Logout button - to be uncommented when auth is integrated */}
          {/* {user?.email ? (
            <button
              onClick={logOut}
              className="text-gray-400 hover:text-yellow-600 font-bold"
            >
              Profile
            </button>
          ) : (
            <Link
              href="/login"
              className="text-gray-400 hover:text-yellow-600 font-bold"
            >
              LogIn
            </Link>
          )} */}
          <Link
            href="/login"
            className="text-gray-400 hover:text-yellow-600 font-bold"
          >
            LogIn (Functionality to be implemented)
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

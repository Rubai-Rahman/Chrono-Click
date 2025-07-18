import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../public/favicon.png';
import { ShoppingCart } from 'lucide-react';
import { Button } from './ui/button';
import { ProfileMenu } from './profile/profile-menu';
import Cart from './cart/cart';

const Navbar = () => {
  let auth = false;
  return (
    <nav className="bg-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="home" className="flex items-center space-x-2">
          <Image
            alt="logo"
            src={logo}
            width={30}
            height={30}
            className="inline-block align-top"
          />
          <span className="text-primary text-xl font-bold">CHRONO CLICK</span>
        </Link>
        <div className="flex space-x-4">
          <Link
            href="/home"
            className="text-primary-foreground hover:text-primary font-bold"
          >
            Home
          </Link>
          <Link
            href="/shop"
            className="text-primary-foreground hover:text-primary font-bold"
          >
            Shop
          </Link>
          <Link
            href="/order"
            className="text-primary-foreground hover:text-primary font-bold"
          >
            Order
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Cart />
          {auth ? (
            <Link
              href="/login"
              className="text-primary-foreground hover:text-primary font-bold"
            >
              LogIn
            </Link>
          ) : (
            <ProfileMenu />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

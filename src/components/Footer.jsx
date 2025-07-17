import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import icon from '../../public/favicon.png'; // Assuming favicon.png is in public folder

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h2 className="text-yellow-600 text-xl font-bold mb-4">
              Information
            </h2>
            <ul>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Search
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Help
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Shipping Details
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Privacy Policy
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Information
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-yellow-600 text-xl font-bold mb-4">
              My Account
            </h2>
            <ul>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Contact Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Careers
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Return Centre
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Deliveries
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-yellow-600 text-xl font-bold mb-4">Help</h2>
            <ul>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Search Terms
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Advanced Search
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Help & FAQs
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Store Locations
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Orders and Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-yellow-600 text-xl font-bold mb-4">Support</h2>
            <ul>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Chat Support
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  E-mail Support
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  24/7 Support
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Customer Stories
                </Link>
              </li>
              <li className="mb-2">
                <Link href="#" className="hover:text-yellow-600">
                  Term of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-8 border-t border-gray-700">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Image
              src={icon}
              alt="icon"
              width={30}
              height={30}
              className="rounded-full bg-black"
            />
            <span className="text-yellow-600 text-xl font-bold">
              CHRONO CLICK
            </span>
          </div>
          <div className="text-gray-500 text-sm">&copy;2022 Chrono Click</div>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/pri.abir.18"
              className="text-yellow-600 hover:text-white text-2xl transition-all duration-300 hover:scale-150"
            >
              <ion-icon name="logo-facebook"></ion-icon>
            </a>
            <a
              href="https://www.instagram.com/"
              className="text-yellow-600 hover:text-white text-2xl transition-all duration-300 hover:scale-150"
            >
              <ion-icon name="logo-instagram"></ion-icon>
            </a>
            <a
              href="https://www.linkedin.com/in/rubai-rahman-116707216/"
              className="text-yellow-600 hover:text-white text-2xl transition-all duration-300 hover:scale-150"
            >
              <ion-icon name="logo-linkedin"></ion-icon>
            </a>
            <a
              href="https://twitter.com/home"
              className="text-yellow-600 hover:text-white text-2xl transition-all duration-300 hover:scale-150"
            >
              <ion-icon name="logo-twitter"></ion-icon>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// components/Footer.tsx
import Link from 'next/link';
import Image from 'next/image';
import icon from '../../../../public/favicon.png';
import { Facebook, Instagram, Linkedin, X } from 'lucide-react';

const Footer = () => {
  const sections = [
    {
      title: 'Information',
      links: [
        'Search',
        'Help',
        'Shipping Details',
        'Privacy Policy',
        'Information',
      ],
    },
    {
      title: 'My Account',
      links: [
        'Contact Us',
        'About Us',
        'Careers',
        'Return Centre',
        'Deliveries',
      ],
    },
    {
      title: 'Help',
      links: [
        'Search Terms',
        'Advanced Search',
        'Help & FAQs',
        'Store Locations',
        'Orders and Returns',
      ],
    },
    {
      title: 'Support',
      links: [
        'Chat Support',
        'E-mail Support',
        '24/7 Support',
        'Customer Stories',
        'Term of Use',
      ],
    },
  ];

  const socialLinks = [
    { href: 'https://www.facebook.com/pri.abir.18', icon: <Facebook /> },
    { href: 'https://www.instagram.com/', icon: <Instagram /> },
    {
      href: 'https://www.linkedin.com/in/rubai-rahman-116707216/',
      icon: <Linkedin />,
    },
    { href: 'https://twitter.com/home', icon: <X /> },
  ];

  return (
    <footer className="bg-background text- py-10 mt-20">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h2 className="text-primary text-lg font-semibold mb-4">
                {section.title}
              </h2>
              <ul>
                {section.links.map((link, i) => (
                  <li key={i} className="mb-2 hover:text-primary transition">
                    <Link href="#">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-12 pt-8 border-t border-primary gap-6 text-sm">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={icon}
              alt="Chrono Click"
              width={30}
              height={30}
              className="rounded-full bg-black"
            />
            <span className="text-primary font-bold text-xl">CHRONO CLICK</span>
          </div>

          {/* Copyright */}
          <p className="text-gray-500 text-center md:text-left">
            &copy; {new Date().getFullYear()} Chrono Click. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4 text-primary text-2xl">
            {socialLinks.map(({ href, icon }, idx) => (
              <a
                key={idx}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-transform hover:scale-125"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

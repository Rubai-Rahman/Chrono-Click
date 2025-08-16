import {
  Home,
  LayoutList,
  ShoppingCart,
  User,
  Gem,
  Clock,
  ShoppingBag,
  Handshake,
} from 'lucide-react';

// Main navigation items
export const navItems = [
  { name: 'Shop', href: '/products' },
  { name: 'Categories', href: '/categories' },
  { name: 'Brands', href: '/brands' },
  { name: 'News', href: '/news' },
  { name: 'About', href: '/about' },
];

export const slides = [
  {
    image: '/images/slider/slider1-bg.webp',
    title: 'PREMIUM MODEL',
    description: 'Stylish external wrist watch',
    link: '/shop',
  },
  {
    image: '/images/slider/slider2-bg.webp',
    title: 'FALL IN LOVE',
    description: 'Redefining the meaning of time',
    link: '/shop',
  },
  {
    image: '/images/slider/slider3-bg.webp',
    title: 'SECRET NEW MODELS',
    description: 'Priceless and timeless designs',
    link: '/shop',
  },
];
export const brands = [
  {
    name: 'CAIRNHILL',
    logo: '/images/brands/cairnhill.jpg',
    alt: 'Cairnhill logo',
  },
  {
    name: 'CASIO',
    logo: '/images/brands/casio.jpg',
    alt: 'Casio logo',
  },
  {
    name: 'CELLOX',
    logo: '/images/brands/cellox.jpg',
    alt: 'Cellox logo',
  },
  {
    name: 'CITIZEN',
    logo: '/images/brands/citizen.jpg',
    alt: 'Citizen logo',
  },
  {
    name: 'CREDENCE',
    logo: '/images/brands/credence.jpg',
    alt: 'Credence logo',
  },
  {
    name: 'FIYTA',
    logo: '/images/brands/fiyta.jpg',
    alt: 'Fiyta logo',
  },
  {
    name: 'MONTREX',
    logo: '/images/brands/montrex.jpg',
    alt: 'Montrex logo',
  },
  {
    name: 'OBAKU',
    logo: '/images/brands/obaku.jpg',
    alt: 'Rolex logo',
  },

  {
    name: 'ROMANSON',
    logo: '/images/brands/romanson.jpg',
    alt: 'ROMANSON logo',
  },
  {
    name: 'ROSSINI',
    logo: '/images/brands/rossini.jpg',
    alt: 'Breitling logo',
  },
  {
    name: 'SEIKO',
    logo: '/images/brands/seiko.jpg',
    alt: 'Seiko logo',
  },
  {
    name: 'SONATA',
    logo: '/images/brands/sonata.jpg',
    alt: 'Sonata logo',
  },
  {
    name: 'TIMEX',
    logo: '/images/brands/timex.jpg',
    alt: 'Timeex logo',
  },
];
// Interactive cards data for about page
export const aboutCards = [
  {
    icon: Gem,
    title: 'Unrivaled Quality',
    description:
      'Hand-picked timepieces from trusted manufacturers and artisans.',
  },
  {
    icon: Clock,
    title: 'Expert Curation',
    description:
      'A carefully selected collection for every style and occasion.',
  },
  {
    icon: ShoppingBag,
    title: 'Seamless Shopping',
    description:
      'Enjoy a smooth, secure, and delightful online shopping experience.',
  },
  {
    icon: Handshake,
    title: 'Dedicated Support',
    description:
      'Our team is here to assist you every step of your horological journey.',
  },
];

// Team members data for about page
export const teamMembers = [
  {
    name: 'John Doe',
    position: 'Founder & CEO',
    image: '/images/team-member/johndoe.webp',
    initials: 'JD',
  },
  {
    name: 'Jane Appleseed',
    position: 'Head of Curation',
    image: '/images/team-member/Jane-appleseed.webp',
    initials: 'JA',
  },
  {
    name: 'Michael Smith',
    position: 'Logistics Manager',
    image: '/images/team-member/micheaelSmith.webp',
    initials: 'MS',
  },
  {
    name: 'Emily Lee',
    position: 'Customer Experience Lead',
    image: '/images/team-member/emilylee.webp',
    initials: 'EL',
  },
];

// Mobile bottom navigation items (handled by MobileNav component)
export const bottomNavItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Shop', href: '/products', icon: LayoutList },
  { name: 'Cart', icon: ShoppingCart },
  { name: 'Account', href: '/account', icon: User },
];
// API Configuration
export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  USERS: '/users',
  ORDERS: '/orders',
  CONTACT: '/api/contact',
} as const;

// App Configuration
export const APP_CONFIG = {
  NAME: 'Chrono Click',
  DESCRIPTION: 'Premium Timepieces & Luxury Watches',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@chronoclick.com',
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 100,
} as const;

// Session Configuration
export const SESSION_CONFIG = {
  DEFAULT_EXPIRY: 2 * 60 * 60 * 1000, // 2 hours
  REMEMBER_ME_EXPIRY: 7 * 24 * 60 * 60 * 1000, // 7 days
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
} as const;

// File Upload
export const FILE_UPLOAD = {
  MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/webp'],
} as const;

const auth = true;
export const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Shop', href: '/shop' },
  { name: 'Order', href: '/order' },
  ...(auth ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
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

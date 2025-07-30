const auth = true;
export const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Orders', href: '/orders' },
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

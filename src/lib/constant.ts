const auth = true;
export const navItems = [
  { name: 'Home', href: '/home' },
  { name: 'Shop', href: '/shop' },
  { name: 'Order', href: '/order' },
  ...(auth ? [{ name: 'Dashboard', href: '/dashboard' }] : []),
];

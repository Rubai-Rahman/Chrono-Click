'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const mainNavigation = [
  { label: 'Products', href: '/products' },
  { label: 'Brands', href: '/brands' },
  { label: 'News', href: '/news' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center">
      <div className="flex items-center gap-1 bg-muted/30 rounded-full p-1 ">
        {mainNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full group capitalize',
              pathname === item.href || pathname.startsWith(item.href)
                ? 'text-foreground bg-background/80 shadow-sm'
                : 'text-foreground/80 hover:text-foreground hover:bg-background/80 hover:shadow-sm'
            )}
          >
            {item.label}
            <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </nav>
  );
}

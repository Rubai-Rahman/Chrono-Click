'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { bottomNavItems } from '@/lib/constant';
import Cart from '@/components/cart/cart';
import ProfileMenu from '@/components/profile/profile-menu';

export default function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <>
      {/* Gradient overlay for content above the bottom nav */}
      <div className="fixed bottom-16 left-0 right-0 z-40 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none md:hidden" />

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t border-border shadow-lg md:hidden">
        <div className="flex h-full items-center justify-around">
          {bottomNavItems.map((item) => (
            <Link
              key={item.name}
              href={item?.href || '#'}
              className={`flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors ${
                pathname === item.href
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {item.name === 'Cart' ? (
                <Cart />
              ) : item.name === 'My Account' ? (
                <ProfileMenu />
              ) : (
                <item.icon className="h-5 w-5" />
              )}

              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, ShoppingCart, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import Cart from '@/components/cart/cart';
import { useAuth } from '@/hooks/useAuth';

const mobileNavigation = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Shop', href: '/products', icon: Search },
  { label: 'Cart', href: '/cart', icon: ShoppingCart, isCart: true },
  { label: 'Account', href: '/account', icon: User, requiresAuth: true },
];

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <>
      {/* Gradient overlay for content above the bottom nav */}
      <div className="fixed bottom-16 left-0 right-0 z-40 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none md:hidden" />

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 h-16 bg-background border-t border-border shadow-lg md:hidden">
        <div className="flex h-full items-center justify-around">
          {mobileNavigation.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));

            // Handle cart specially
            if (item.isCart) {
              return (
                <div
                  key={item.label}
                  className="flex flex-col items-center justify-center gap-1 text-xs font-medium"
                >
                  <Cart />
                  <span className="text-muted-foreground">{item.label}</span>
                </div>
              );
            }

            // Handle auth-required items
            if (item.requiresAuth && !user) {
              return (
                <Link
                  key={item.label}
                  href="/login"
                  className="flex flex-col items-center justify-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>Login</span>
                </Link>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center gap-1 text-xs font-medium transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}

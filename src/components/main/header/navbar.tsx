'use client';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/favicon.png';
import { Suspense } from 'react';
import Cart from '../../cart/cart';
import { MainNav } from '@/components/navigation/main-nav';
import { UserNav } from '@/components/navigation/user-nav';
import MobileNav from '@/components/navigation/mobile-nav';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-3">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              <Image
                src={logo}
                alt="Logo"
                width={32}
                height={32}
                className="relative z-10 rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-primary font-bold text-xl tracking-tight">
                CHRONO CLICK
              </span>
              <span className="text-xs text-muted-foreground font-medium">
                Premium Timepieces
              </span>
            </div>
          </Link>
          <MainNav />
          <div className="hidden md:flex items-center gap-3">
            {/* Cart */}
            <div className="relative">
              <Cart />
            </div>

            {/* User Navigation */}
            <Suspense fallback={<div className="w-10 h-10" />}>
              <UserNav />
            </Suspense>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Menu Trigger */}
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

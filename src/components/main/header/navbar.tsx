'use client';

import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../../public/favicon.png';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Suspense } from 'react';
import Cart from '../../cart/cart';
import { MainNav } from '@/components/navigation/main-nav';
import { UserNav } from '@/components/navigation/user-nav';

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

          {/* Desktop Navigation */}
          <MainNav />

          {/* Desktop Actions */}
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
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] sm:w-[350px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  {/* Mobile Header */}
                  <div className="flex items-center gap-3 pb-6 border-b border-border">
                    <Image
                      src={logo}
                      alt="Chrono Click Logo"
                      width={32}
                      height={32}
                      className="relative z-10 rounded-full"
                    />
                    <div>
                      <span className="text-primary font-bold text-lg">
                        CHRONO CLICK
                      </span>
                      <p className="text-xs text-muted-foreground">
                        Premium Timepieces
                      </p>
                    </div>
                  </div>

                  {/* Mobile Navigation */}
                  <div className="flex flex-col gap-2 py-6">
                    <Link
                      href="/products"
                      className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      Shop
                    </Link>
                    <Link
                      href="/categories"
                      className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      Categories
                    </Link>
                    <Link
                      href="/brands"
                      className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      Brands
                    </Link>
                    <Link
                      href="/news"
                      className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      News
                    </Link>
                    <Link
                      href="/about"
                      className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      About
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

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
import { Menu, User } from 'lucide-react';
import { Suspense, lazy } from 'react';
import Cart from '../../cart/cart';
import { navItems } from '@/lib/constant';
import { useAuth } from '@/hooks/useAuth';

const ProfileMenu = lazy(() => import('../../profile/profile-menu'));

const Navbar = () => {
  const { isAuthenticated, user } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full shadow-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar with subtle gradient */}
      <div className="h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

      <div className="responsive-space-x">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              <Image
                src={logo}
                alt="Chrono Click Logo"
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
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-muted/30 rounded-full p-1">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="relative px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-all duration-200 rounded-full hover:bg-background/80 hover:shadow-sm group"
                >
                  {item.name}
                  <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Cart */}
            <div className="relative">
              <Cart />
            </div>

            {/* Profile/Auth */}
            {isAuthenticated ? (
              <Suspense
                fallback={
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                }
              >
                <ProfileMenu />
              </Suspense>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                  <Link href="/login">Log In</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Cart */}
            <Cart />

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
                      src="/placeholder.svg?height=40&width=40"
                      alt="Logo"
                      width={40}
                      height={40}
                      className="rounded-full"
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
                    {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Auth Section */}
                  <div className="mt-auto pt-6 border-t border-border">
                    {isAuthenticated ? (
                      <div className="px-3">
                        <Suspense
                          fallback={
                            <div className="text-sm">Loading profile...</div>
                          }
                        >
                          <ProfileMenu />
                        </Suspense>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 px-3">
                        <Button
                          variant="outline"
                          asChild
                          className="w-full bg-transparent"
                        >
                          <Link href="/login">Log In</Link>
                        </Button>
                        <Button
                          asChild
                          className="w-full bg-gradient-to-r from-primary to-primary/80"
                        >
                          <Link href="/signup">Sign Up</Link>
                        </Button>
                      </div>
                    )}
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

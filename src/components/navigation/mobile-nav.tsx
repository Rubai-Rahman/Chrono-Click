'use client';

import logo from '../../../public/favicon.png';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Navigation config
const mainNavigation = [
  { label: 'Home', type: 'link', href: '/' },
  {
    label: 'Products',
    type: 'menu',
    children: [
      { label: 'Gents Collection', href: '/products/gents' },
      { label: 'Ladies Collection', href: '/products/ladies' },
      { label: 'Chain Collection', href: '/products/chain' },
      { label: 'Leather Collection', href: '/products/leather' },
      { label: 'Wall Clocks', href: '/products/wall-clocks' },
    ],
  },
  {
    label: 'Brands',
    type: 'menu',
    children: [
      { label: 'Seiko', href: '/brands/seiko' },
      { label: 'Casio', href: '/brands/casio' },
      { label: 'Rolex', href: '/brands/rolex' },
    ],
  },
  { label: 'News', type: 'link', href: '/news' },
  { label: 'About Us', type: 'link', href: '/about' },
  { label: 'Contact Us', type: 'link', href: '/contact' },
];

const MobileNav = () => {
  return (
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
          <nav className="flex flex-col gap-2 py-6">
            {mainNavigation.map((item) =>
              item.type === 'link' ? (
                <Link
                  key={item.href}
                  href={item.href!}
                  className="flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <Accordion key={item.label} type="single" collapsible>
                  <AccordionItem value={item.label}>
                    <AccordionTrigger className="px-3 py-3 text-sm font-medium rounded-lg hover:bg-muted/50 transition-colors">
                      {item.label}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pl-4">
                        {item.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-sm hover:text-primary transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            )}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;

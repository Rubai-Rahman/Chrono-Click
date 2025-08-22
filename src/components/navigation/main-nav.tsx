'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import Brands from '../main/home/brands';

const mainNavigation = [
  { label: 'Home', type: 'link', href: '/' },
  { label: 'Products', type: 'menu' },
  { label: 'Brands', type: 'menu' },
  { label: 'News', type: 'link', href: '/news' },
  { label: 'About Us', type: 'link', href: '/about' },
  { label: 'Contact Us', type: 'link', href: '/contact' },
];

const productCategories = [
  {
    title: 'GENDER',
    collections: [
      { name: 'GENTS COLLECTION', href: '/products/gents' },
      { name: 'LADIES COLLECTION', href: '/products/ladies' },
    ],
  },
  {
    title: 'BRACELET METAL',
    collections: [
      { name: 'CHAIN COLLECTION', href: '/products/chain' },
      { name: 'LEATHER COLLECTION', href: '/products/leather' },
    ],
  },
  {
    title: 'WALL CLOCKS',
    collections: [
      { name: 'WALL CLOCK COLLECTION', href: '/products/wall-clocks' },
    ],
  },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <nav className="hidden md:flex items-center">
      <div className="flex items-center gap-1 bg-muted/30 rounded-full p-1">
        {mainNavigation.map((item) => {
          if (item.type === 'link') {
            return (
              <Link
                key={item.href}
                href={item.href!}
                className={cn(
                  'relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-full group capitalize',
                  pathname === item.href ||
                    (item.href && pathname.startsWith(item.href))
                    ? 'text-foreground bg-background/80 shadow-sm'
                    : 'text-foreground/80 hover:text-foreground hover:bg-background/80 hover:shadow-sm'
                )}
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-px h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            );
          }

          if (item.label === 'Products') {
            return (
              <NavigationMenu key="products" className="container mx-auto ">
                <NavigationMenuItem className="list-none">
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-full p-6">
                      <div className="flex items-start gap-8">
                        {/* Product Image */}
                        <div className="flex-shrink-0">
                          <div className="w-48 h-32 bg-muted rounded-lg overflow-hidden">
                            <img
                              src="/placeholder.svg?height=128&width=192"
                              alt="TIME ZONE SHOP PAGE"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="mt-2 text-center">
                            <div className="font-bold text-lg">
                              CHRONO CLICK
                            </div>
                            <div className="text-sm text-muted-foreground">
                              SHOP PAGE
                            </div>
                          </div>
                        </div>

                        {/* Product Categories */}
                        <div className="flex-1 grid grid-cols-3 gap-8">
                          {productCategories.map((category) => (
                            <div key={category.title}>
                              <h3 className="font-bold text-lg mb-4 text-primary border-b-2 border-primary pb-1">
                                {category.title}
                              </h3>
                              <ul className="space-y-3">
                                {category.collections.map((collection) => (
                                  <li key={collection.name}>
                                    <Link
                                      href={collection.href}
                                      className="text-sm font-medium text-foreground hover:text-primary transition-colors block"
                                    >
                                      {collection.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            );
          }

          if (item.label === 'Brands') {
            return (
              <NavigationMenu key="brands">
                <NavigationMenuItem className="list-none">
                  <NavigationMenuTrigger>Brands</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[50rem] p-4">
                      <Brands />
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenu>
            );
          }

          return null;
        })}
      </div>
    </nav>
  );
}

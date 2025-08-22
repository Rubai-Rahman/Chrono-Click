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
import { mainNavigation } from '@/lib/constant';
import BrandItem from '../brands/branditem';

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
                  pathname === item.href
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
              <NavigationMenu key="products" fullWidth={true}>
                <NavigationMenuItem className="list-none">
                  <NavigationMenuTrigger className="rounded-full bg-transparent hover:bg-background/80 data-[state=open]:bg-background/80 focus:bg-background/80">
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-full max-w-screen-xl mx-auto">
                      <div className="py-12 bg-card">
                        <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto">
                          {productCategories.map((category) => (
                            <div key={category.title} className="space-y-6">
                              <div>
                                <h3 className="text-lg font-bold text-primary mb-1">
                                  {category.title}
                                </h3>
                                <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-primary/30"></div>
                              </div>
                              <ul className="space-y-4">
                                {category.collections.map((collection) => (
                                  <li key={collection.name}>
                                    <Link
                                      href={collection.href}
                                      className="group flex items-center text-sm font-medium text-foreground/70 hover:text-primary transition-all duration-300 py-2"
                                    >
                                      <div className="w-2 h-2 bg-primary/30 rounded-full mr-4 group-hover:bg-primary group-hover:scale-125 transition-all duration-300"></div>
                                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                                        {collection.name}
                                      </span>
                                      <svg
                                        className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M9 5l7 7-7 7"
                                        />
                                      </svg>
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
              <NavigationMenu key="brands" fullWidth={true}>
                <NavigationMenuItem className="list-none">
                  <NavigationMenuTrigger className="rounded-full bg-transparent hover:bg-background/80 data-[state=open]:bg-background/80 focus:bg-background/80">
                    Brands
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="p-6">
                      <div className="container mx-auto max-w-6xl">
                        <BrandItem />
                      </div>
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

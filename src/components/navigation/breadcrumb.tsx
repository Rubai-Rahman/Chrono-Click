'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  className?: string;
}

// Route mapping for better breadcrumb labels
const routeLabels: Record<string, string> = {
  '/': 'Home',
  '/products': 'Shop',
  '/account': 'My Account',
  '/account/orders': 'My Orders',
  '/account/wishlist': 'Wishlist',
  '/account/addresses': 'Addresses',
  '/account/payment-methods': 'Payment Methods',
  '/account/settings': 'Settings',
  '/admin': 'Admin Dashboard',
  '/admin/products': 'Products',
  '/admin/orders': 'Orders',
  '/admin/customers': 'Customers',
  '/admin/analytics': 'Analytics',
  '/news': 'News',
  '/about': 'About',
  '/contact': 'Contact',
};

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const pathname = usePathname();

  // Generate breadcrumb items from pathname if not provided
  const breadcrumbItems = items || generateBreadcrumbItems(pathname);

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'flex items-center space-x-1 text-sm text-muted-foreground',
        className
      )}
    >
      <Link
        href="/"
        className="flex items-center hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>

      {breadcrumbItems.slice(1).map((item, index) => (
        <div
          key={item.href || item.label}
          className="flex items-center space-x-1"
        >
          <ChevronRight className="h-4 w-4" />
          {item.href && index < breadcrumbItems.length - 2 ? (
            <Link
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}

function generateBreadcrumbItems(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const items: BreadcrumbItem[] = [{ label: 'Home', href: '/' }];

  let currentPath = '';
  for (const segment of segments) {
    currentPath += `/${segment}`;
    const label = routeLabels[currentPath] || formatSegment(segment);
    items.push({
      label,
      href: currentPath,
    });
  }

  return items;
}

function formatSegment(segment: string): string {
  // Handle dynamic routes like [id]
  if (segment.startsWith('[') && segment.endsWith(']')) {
    return 'Details';
  }

  // Convert kebab-case to Title Case
  return segment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

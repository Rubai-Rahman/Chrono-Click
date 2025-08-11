'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  Settings,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/navigation/breadcrumb';

interface AccountLayoutProps {
  children: React.ReactNode;
}

const accountNavigation = [
  {
    href: '/account',
    icon: User,
    label: 'Overview',
    exact: true,
  },
  {
    href: '/account/orders',
    icon: ShoppingBag,
    label: 'Orders',
  },
  {
    href: '/account/wishlist',
    icon: Heart,
    label: 'Wishlist',
  },
  {
    href: '/account/addresses',
    icon: MapPin,
    label: 'Addresses',
  },
  {
    href: '/account/payment-methods',
    icon: CreditCard,
    label: 'Payment Methods',
  },
  {
    href: '/account/settings',
    icon: Settings,
    label: 'Settings',
  },
];

export function AccountLayout({ children }: AccountLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string, exact = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const MenuItem = ({
    href,
    icon: Icon,
    label,
    exact = false,
  }: {
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    exact?: boolean;
  }) => (
    <Link
      href={href}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group',
        isActive(href, exact)
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      )}
      onClick={() => setSidebarOpen(false)}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {isActive(href, exact) && <ChevronRight className="w-4 h-4 ml-auto" />}
    </Link>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/5 to-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-80 bg-card/95 backdrop-blur-sm border-r border-border/50 z-50 transform transition-transform duration-300 lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:static lg:z-auto'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  My Account
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your account and preferences
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {accountNavigation.map((item) => (
              <MenuItem key={item.href} {...item} />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border/50">
            <div className="text-xs text-muted-foreground">
              <p>Need help?</p>
              <Link href="/contact" className="text-primary hover:underline">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-80">
        {/* Mobile Header */}
        <header className="lg:hidden bg-card/95 backdrop-blur-sm border-b border-border/50 p-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="font-semibold">My Account</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Breadcrumb */}
            <Breadcrumb />

            {/* Content */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

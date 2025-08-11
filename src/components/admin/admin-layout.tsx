'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Newspaper,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { logoutAction } from '@/app/actions/authAction';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const adminNavigation = [
  {
    href: '/admin',
    icon: LayoutDashboard,
    label: 'Dashboard',
    exact: true,
  },
  {
    href: '/admin/products',
    icon: Package,
    label: 'Products',
  },
  {
    href: '/admin/orders',
    icon: ShoppingCart,
    label: 'Orders',
  },
  {
    href: '/admin/customers',
    icon: Users,
    label: 'Customers',
  },
  {
    href: '/admin/news',
    icon: Newspaper,
    label: 'News & Content',
  },
  {
    href: '/admin/analytics',
    icon: BarChart3,
    label: 'Analytics',
  },
  {
    href: '/admin/settings',
    icon: Settings,
    label: 'Settings',
  },
];

export function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const handleLogout = () => {
    logoutAction();
  };

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
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Admin Panel
                  </h2>
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary text-xs"
                  >
                    Admin
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Manage your store and customers
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

          {/* Back to Store */}
          <div className="p-6 pb-0">
            <Button variant="outline" size="sm" asChild className="w-full">
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Store
              </Link>
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            {adminNavigation.map((item) => (
              <MenuItem key={item.href} {...item} />
            ))}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border/50">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Log out
            </Button>
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
            <div className="flex items-center gap-2">
              <h1 className="font-semibold">Admin Panel</h1>
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary text-xs"
              >
                Admin
              </Badge>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-6">
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

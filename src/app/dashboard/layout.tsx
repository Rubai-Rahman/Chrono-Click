'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  CreditCard,
  ShoppingBag,
  Star,
  Package,
  Users,
  Plus,
  Settings,
  Newspaper,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { logoutAction } from '../actions/authAction';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { logout, user, isLoading } = useAuth();
  const handleLogout = () => {
    logoutAction();
  };

  // Show loading while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }
  // Use proper role-based admin check
  const admin = user?.role === 'admin';
  // console.log('🏠 Dashboard - User:', user?.email);
  // console.log('🏠 Dashboard - User role:', user?.role);
  // console.log('🏠 Dashboard - Is admin:', admin);

  const userMenuItems = [
    {
      href: '/dashboard',
      icon: LayoutDashboard,
      label: 'Dashboard',
      exact: true,
    },
    { href: '/dashboard/payment', icon: CreditCard, label: 'Payment' },
    { href: '/dashboard/myOrders', icon: ShoppingBag, label: 'My Orders' },
    { href: '/dashboard/review', icon: Star, label: 'Reviews' },
  ];

  const adminMenuItems = [
    { href: '/dashboard/manageOrders', icon: Package, label: 'Manage Orders' },
    { href: '/dashboard/makeAdmin', icon: Users, label: 'Make Admin' },
    { href: '/dashboard/addProduct', icon: Plus, label: 'Add Product' },
    {
      href: '/dashboard/manageProduct',
      icon: Settings,
      label: 'Manage Products',
    },
    { href: '/dashboard/addNews', icon: Newspaper, label: 'Add News' },
  ];

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
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
        isActive(href, exact)
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
      }`}
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
        className={`fixed left-0 top-0 h-full w-80 bg-card/95 backdrop-blur-sm border-r border-border/50 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:static lg:z-auto`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-border/50">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Dashboard
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Manage your account
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
          <nav className="flex-1 p-6 space-y-6 overflow-y-auto">
            {/* User Menu */}
            <div>
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                User Menu
              </h3>
              <div className="space-y-1">
                {userMenuItems.map((item) => (
                  <MenuItem key={item.href} {...item} />
                ))}
              </div>
            </div>

            {/* Admin Menu */}
            {admin && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Admin Panel
                    </h3>
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary text-xs"
                    >
                      Admin
                    </Badge>
                  </div>
                  <div className="space-y-1">
                    {adminMenuItems.map((item) => (
                      <MenuItem key={item.href} {...item} />
                    ))}
                  </div>
                </div>
              </>
            )}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-border/50">
            <Button
              variant="outline"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => handleLogout()}
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
            <h1 className="font-semibold">Dashboard</h1>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

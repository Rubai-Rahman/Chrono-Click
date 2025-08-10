'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ShoppingBag,
  Package,
  Star,
  CreditCard,
  TrendingUp,
  Users,
  Plus,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
const DashboardPageContent = () => {
  const { user } = useAuth();

  // For now, we'll assume admin status based on email or other criteria
  // You can implement proper role-based access control later
  const admin = user?.email?.includes('admin') || false;

  const userStats = [
    {
      title: 'Total Orders',
      value: '12',
      icon: ShoppingBag,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Pending Reviews',
      value: '3',
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Total Spent',
      value: '$1,234',
      icon: CreditCard,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
  ];

  const adminStats = [
    {
      title: 'Total Products',
      value: '156',
      icon: Package,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Total Users',
      value: '1,234',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
    },
    {
      title: 'Monthly Revenue',
      value: '$12,345',
      icon: TrendingUp,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
  ];

  const quickActions = [
    {
      title: 'View My Orders',
      description: 'Check your order history and status',
      href: '/dashboard/myOrders',
      icon: ShoppingBag,
    },
    {
      title: 'Write a Review',
      description: 'Share your experience with products',
      href: '/dashboard/review',
      icon: Star,
    },
    {
      title: 'Make Payment',
      description: 'Complete pending payments',
      href: '/dashboard/payment',
      icon: CreditCard,
    },
  ];

  const adminActions = [
    {
      title: 'Add New Product',
      description: 'Add products to your inventory',
      href: '/dashboard/addProduct',
      icon: Plus,
    },
    {
      title: 'Manage Orders',
      description: 'View and manage all customer orders',
      href: '/dashboard/manageOrders',
      icon: Package,
    },
    {
      title: 'Add News',
      description: 'Create news and announcements',
      href: '/dashboard/addNews',
      icon: Plus,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent mb-4">
          Welcome back{user?.displayName ? `, ${user.displayName}` : ''}!
        </h1>
        <p className="text-xl text-muted-foreground">
          {admin
            ? 'Manage your store and track performance from your admin dashboard.'
            : 'Track your orders, reviews, and account activity from your personal dashboard.'}
        </p>
        {admin && (
          <Badge className="mt-4 bg-primary/10 text-primary border-primary/20">
            Administrator Access
          </Badge>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(admin ? adminStats : userStats).map((stat, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(admin ? adminActions : quickActions).map((action, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <action.icon className="w-5 h-5 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{action.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-muted-foreground mb-4">
                  {action.description}
                </p>
                <Button variant="outline" asChild>
                  <Link href={action.href}>
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Order #1234 completed</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">New review submitted</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Payment processed</p>
                <p className="text-sm text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPageContent;

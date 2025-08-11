'use client';

import { PageHeader } from '@/components/account/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  User,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

const quickActions = [
  {
    title: 'View Orders',
    description: 'Track your recent purchases',
    href: '/account/orders',
    icon: ShoppingBag,
    count: '3 active',
  },
  {
    title: 'Wishlist',
    description: 'Items you want to buy later',
    href: '/account/wishlist',
    icon: Heart,
    count: '12 items',
  },
  {
    title: 'Addresses',
    description: 'Manage shipping addresses',
    href: '/account/addresses',
    icon: MapPin,
    count: '2 saved',
  },
  {
    title: 'Payment Methods',
    description: 'Manage payment options',
    href: '/account/payment-methods',
    icon: CreditCard,
    count: '1 card',
  },
];

const AccountPageContent = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <PageHeader
        title="Account Overview"
        description={`Welcome back${
          user?.name ? `, ${user.name}` : ''
        }! Here's what's happening with your account.`}
      />

      {/* Account Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Orders
                </p>
                <p className="text-3xl font-bold mt-2">12</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Wishlist Items
                </p>
                <p className="text-3xl font-bold mt-2">8</p>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <Heart className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Spent
                </p>
                <p className="text-3xl font-bold mt-2">$2,340</p>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Member Since
                </p>
                <p className="text-lg font-bold mt-2">2023</p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <User className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <action.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{action.count}</Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Button variant="outline" asChild className="w-full">
                  <Link href={action.href}>
                    View Details
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
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Order #1234 delivered</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Added item to wishlist</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <div className="flex-1">
                <p className="font-medium">Payment method updated</p>
                <p className="text-sm text-muted-foreground">3 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountPageContent;

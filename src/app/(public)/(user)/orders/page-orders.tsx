'use client';

import { useState } from 'react';
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  ChevronUp,
  Eye,
  RotateCcw,
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';

// Mock order data
const orders = [
  {
    id: 'ORD-2024-001',
    date: '2024-01-15',
    total: 299.99,
    status: 'delivered',
    items: [
      { name: 'Wireless Headphones', quantity: 1, price: 199.99 },
      { name: 'Phone Case', quantity: 2, price: 50.0 },
    ],
    tracking: {
      carrier: 'FedEx',
      trackingNumber: '1234567890',
      estimatedDelivery: '2024-01-18',
      updates: [
        { date: '2024-01-18', status: 'Delivered', location: 'Your doorstep' },
        {
          date: '2024-01-17',
          status: 'Out for delivery',
          location: 'Local facility',
        },
        {
          date: '2024-01-16',
          status: 'In transit',
          location: 'Distribution center',
        },
        { date: '2024-01-15', status: 'Shipped', location: 'Origin facility' },
      ],
    },
  },
  {
    id: 'ORD-2024-002',
    date: '2024-01-20',
    total: 149.5,
    status: 'shipped',
    items: [{ name: 'Bluetooth Speaker', quantity: 1, price: 149.5 }],
    tracking: {
      carrier: 'UPS',
      trackingNumber: '0987654321',
      estimatedDelivery: '2024-01-23',
      updates: [
        {
          date: '2024-01-21',
          status: 'In transit',
          location: 'Distribution center',
        },
        { date: '2024-01-20', status: 'Shipped', location: 'Origin facility' },
      ],
    },
  },
  {
    id: 'ORD-2024-003',
    date: '2024-01-22',
    total: 89.99,
    status: 'processing',
    items: [
      { name: 'USB Cable', quantity: 3, price: 29.99 },
      { name: 'Screen Protector', quantity: 1, price: 29.99 },
    ],
    tracking: null,
  },
  {
    id: 'ORD-2024-004',
    date: '2024-01-10',
    total: 459.99,
    status: 'cancelled',
    items: [
      { name: 'Gaming Mouse', quantity: 1, price: 129.99 },
      { name: 'Mechanical Keyboard', quantity: 1, price: 329.99 },
    ],
    tracking: null,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle className="h-4 w-4" />;
    case 'shipped':
      return <Truck className="h-4 w-4" />;
    case 'processing':
      return <Clock className="h-4 w-4" />;
    case 'cancelled':
      return <XCircle className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'delivered':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'shipped':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function OrderPageContent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-foreground text-balance">
            My Orders
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search orders or products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No orders found
                </h3>
                <p className="text-muted-foreground text-center">
                  {searchTerm
                    ? 'Try adjusting your search terms'
                    : "You haven't placed any orders yet"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">
                          {order.id}
                        </h3>
                        <Badge
                          className={`${getStatusColor(
                            order.status
                          )} capitalize`}
                        >
                          <span className="flex items-center gap-1">
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Ordered on{' '}
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">
                        ${order.total.toFixed(2)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {order.items.length} item
                        {order.items.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                      >
                        <div>
                          <p className="font-medium text-foreground">
                            {item.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-foreground">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                    {order.status === 'delivered' && (
                      <Button variant="outline" size="sm">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reorder
                      </Button>
                    )}
                    {order.tracking && (
                      <Collapsible
                        open={expandedOrders.includes(order.id)}
                        onOpenChange={() => toggleOrderExpansion(order.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Truck className="h-4 w-4 mr-2" />
                            Track Package
                            {expandedOrders.includes(order.id) ? (
                              <ChevronUp className="h-4 w-4 ml-2" />
                            ) : (
                              <ChevronDown className="h-4 w-4 ml-2" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4">
                          <div className="bg-muted rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-foreground">
                                  {order.tracking.carrier} -{' '}
                                  {order.tracking.trackingNumber}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Est. delivery:{' '}
                                  {new Date(
                                    order.tracking.estimatedDelivery
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>
                            <div className="space-y-2">
                              {order.tracking.updates.map((update, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <div
                                    className={`w-2 h-2 rounded-full mt-2 ${
                                      index === 0
                                        ? 'bg-primary'
                                        : 'bg-muted-foreground'
                                    }`}
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-foreground">
                                      {update.status}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                      {update.location} •{' '}
                                      {new Date(
                                        update.date
                                      ).toLocaleDateString()}
                                    </p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

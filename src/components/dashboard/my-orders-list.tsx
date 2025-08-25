'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { OrderType } from '@/lib/types/api/order-type';

interface MyOrdersListProps {
  orders: OrderType[];
}

const MyOrdersList = ({ orders }: MyOrdersListProps) => {
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'processing':
        return <RefreshCw className="w-4 h-4" />;
      case 'shipped':
        return <Truck className="w-4 h-4" />;
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  console.log(formatDate);
  if (orders.length === 0) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-primary" />
            My Orders
          </h1>
          <p className="text-muted-foreground mt-2">
            Track and manage your order history
          </p>
        </div>

        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
            <p className="text-muted-foreground text-center mb-6">
              You haven&apos;t placed any orders yet. Start shopping to see your
              orders here.
            </p>
            <Button asChild>
              <a href="/product">Start Shopping</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-primary" />
          My Orders
        </h1>
        <p className="text-muted-foreground mt-2">
          Track and manage your order history ({orders.length} orders)
        </p>
      </div>

      {/* Orders List */}
      <div className="grid gap-6">
        {orders.map((order) => (
          <Card key={order._id} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div></div>
                <div className="flex items-center gap-3">
                  <Badge
                    className={`${getStatusColor(
                      order.status
                    )} flex items-center gap-1`}
                  >
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() +
                      order.status.slice(1)}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(order)}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Order Items */}
                <div className="md:col-span-2">
                  <h4 className="font-medium mb-3">
                    Items ({order.items.length})
                  </h4>
                  <div className="space-y-3">
                    {order.items.slice(0, 2).map((item) => (
                      <div key={item._id} className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                          <Image
                            src={item.img || '/default.webp'}
                            alt={item.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 2 && (
                      <p className="text-sm text-muted-foreground">
                        +{order.items.length - 2} more items
                      </p>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    className={`${getStatusColor(
                      selectedOrder.status
                    )} flex items-center gap-1`}
                  >
                    {getStatusIcon(selectedOrder.status)}
                    {selectedOrder.status.charAt(0).toUpperCase() +
                      selectedOrder.status.slice(1)}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedOrder(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Items */}
              <div>
                <h3 className="font-semibold mb-4">Order Items</h3>
                <div className="space-y-4">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="w-16 h-16 bg-background rounded-lg overflow-hidden">
                        <Image
                          src={item.img || '/default.webp'}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          ${item.price.toFixed(2)} each
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">Qty: {item.quantity}</p>
                        <p className="text-sm text-muted-foreground">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Shipping Address */}

              <Separator />

              {/* Order Summary */}

              {/* Actions */}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default MyOrdersList;

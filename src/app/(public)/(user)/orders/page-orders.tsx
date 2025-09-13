'use client';

import { use, useState } from 'react';
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
  ShoppingBag,
  CreditCard,
  Star,
  Calendar,
  MapPin,
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
import { FrontendOrder } from '@/lib/types/api/order-type';
import { ApiResult } from '@/lib/fetch';
import { ErrorResultMessage } from '@/components/ui/data-result-message';
import Image from 'next/image';
import Container from '@/components/layout/container';

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
    case 'pending':
      return <Package className="h-4 w-4" />;
    default:
      return <Package className="h-4 w-4" />;
  }
};

const getStatusVariant = (
  status: string
): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'delivered':
      return 'default';
    case 'shipped':
      return 'secondary';
    case 'processing':
      return 'outline';
    case 'cancelled':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getPaymentMethodIcon = (method: string) => {
  switch (method) {
    case 'cash_on_delivery':
      return '💰';
    case 'sslcommerz':
      return '💳';
    default:
      return '💳';
  }
};

export default function OrderPageContent({
  orderPromise,
}: {
  orderPromise: Promise<ApiResult<FrontendOrder[]>>;
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedOrders, setExpandedOrders] = useState<string[]>([]);

  const ordersData = use(orderPromise);

  if (ordersData.error) return <ErrorResultMessage />;

  const orders = ordersData.data ?? [];

  const filteredOrders = orders.filter(
    (order) =>
      order.orderCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderItems.some((item) =>
        item.productId.name.toLowerCase().includes(searchTerm.toLowerCase())
      ) ||
      order.orderInfo.firstName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      order.orderInfo.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Container>
      <div className="min-h-screen bg-gradient-subtle">
        <div className=" px-4 py-8 ">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6 w-full bg-card/80 backdrop-blur-sm rounded-xl p-4">
              <div className="p-3 bg-gradient-luxury rounded-xl text-primary shadow-luxury">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-luxury bg-clip-text text-primary">
                  My Orders
                </h1>
                <p className="text-muted-foreground text-lg">
                  Track and manage your luxury watch orders
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search orders, products, or names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 bg-card border-border/50 shadow-card focus:shadow-luxury transition-all duration-300"
              />
            </div>
          </div>

          {/* Orders Grid */}
          <div className="space-y-6">
            {filteredOrders.length === 0 ? (
              <Card className="shadow-card border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <div className="p-4 bg-muted/50 rounded-full mb-6">
                    <Package className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground mb-2">
                    No orders found
                  </h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    {searchTerm
                      ? "Try adjusting your search terms to find what you're looking for"
                      : "You haven't placed any orders yet. Start shopping for luxury watches!"}
                  </p>
                  {!searchTerm && (
                    <Button className="mt-6 bg-gradient-luxury hover:opacity-90 shadow-luxury">
                      Start Shopping
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              filteredOrders.map((order) => (
                <Card
                  key={order._id}
                  className="overflow-hidden shadow-card hover:shadow-luxury transition-all duration-300 border-border/50 bg-card/80 backdrop-blur-sm"
                >
                  <CardHeader className="pb-4 bg-gradient-to-r from-card to-muted/20">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 flex-wrap">
                          <h3 className="font-bold text-xl text-foreground">
                            {order.orderCode}
                          </h3>
                          <Badge
                            variant={getStatusVariant(order.status)}
                            className="capitalize font-medium px-3 py-1"
                          >
                            <span className="flex items-center gap-2">
                              {getStatusIcon(order.status)}
                              {order.status}
                            </span>
                          </Badge>
                          <Badge variant="outline" className="font-medium">
                            <CreditCard className="h-3 w-3 mr-1" />
                            {getPaymentMethodIcon(order.paymentMethod)}{' '}
                            {order.paymentMethod.replace('_', ' ')}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(order.createdAt)}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {order.orderInfo.address.city},{' '}
                            {order.orderInfo.address.country}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-3xl font-bold bg-gradient-gold bg-clip-text text-primary">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.orderItems.length} item
                          {order.orderItems.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Order Items */}
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Items Ordered
                      </h4>
                      {order.orderItems.map((item) => (
                        <div
                          key={item._id}
                          className="flex gap-4 p-4 rounded-xl bg-muted/30 border border-border/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="relative">
                            <Image
                              width={60}
                              height={60}
                              src={item.productId.img}
                              alt={item.productId.name}
                              className="size-20 rounded-lg object-cover border border-border/50 shadow-card"
                            />
                            <Badge className="absolute -top-2 -right-2 bg-luxury-gold text-primary font-bold text-xs bg-accent rounded-full">
                              {item.quantity}
                            </Badge>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-foreground text-lg mb-1 truncate">
                              {item.productId.name}
                            </h5>
                            <p className="text-luxury-blue font-medium mb-2">
                              {item.productId.brand}
                            </p>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-luxury-gold text-luxury-gold" />
                                <span className="text-sm font-medium">
                                  {item.productId.rating}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  ({item.productId.reviews} reviews)
                                </span>
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {item.productId.category}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-foreground">
                              $
                              {(item.productId.price * item.quantity).toFixed(
                                2
                              )}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              ${item.productId.price} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gradient-to-r from-muted/50 to-muted/20 rounded-xl p-4 border border-border/30">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Subtotal</p>
                          <p className="font-semibold">
                            ${order.subtotal.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Shipping</p>
                          <p className="font-semibold">
                            {order.shipping > 0
                              ? `$${order.shipping.toFixed(2)}`
                              : 'Free'}
                          </p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Tax</p>
                          <p className="font-semibold">
                            ${order.tax.toFixed(2)}
                          </p>
                        </div>
                        <div className="md:text-right">
                          <p className="text-muted-foreground">Total</p>
                          <p className="font-bold text-lg bg-gradient-gold bg-clip-text ">
                            ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Actions and Details */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <Button
                        variant="outline"
                        className="shadow-card hover:shadow-luxury transition-all"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                      {order.status === 'delivered' && (
                        <Button
                          variant="outline"
                          className="shadow-card hover:shadow-luxury transition-all"
                        >
                          <RotateCcw className="h-4 w-4 mr-2" />
                          Reorder
                        </Button>
                      )}
                      <Collapsible
                        open={expandedOrders.includes(order._id!)}
                        onOpenChange={() => toggleOrderExpansion(order._id!)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button
                            variant="outline"
                            className="shadow-card hover:shadow-luxury transition-all"
                          >
                            <Truck className="h-4 w-4 mr-2" />
                            Shipping Details
                            {expandedOrders.includes(order._id!) ? (
                              <ChevronUp className="h-4 w-4 ml-2" />
                            ) : (
                              <ChevronDown className="h-4 w-4 ml-2" />
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4">
                          <div className="bg-gradient-to-r from-muted/30 to-muted/10 rounded-xl p-6 border border-border/30 space-y-4">
                            <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <h5 className="font-semibold text-foreground">
                                  Shipping Information
                                </h5>
                                <div className="space-y-2 text-sm">
                                  <p>
                                    <span className="font-medium">Method:</span>{' '}
                                    {order.orderInfo.shippingMethod} shipping
                                  </p>
                                  <p>
                                    <span className="font-medium">Cost:</span>{' '}
                                    {order.shipping > 0
                                      ? `$${order.shipping}`
                                      : 'Free'}
                                  </p>
                                  <p>
                                    <span className="font-medium">Status:</span>{' '}
                                    {order.status}
                                  </p>
                                  <p>
                                    <span className="font-medium">
                                      Payment Status:
                                    </span>{' '}
                                    {order.paymentStatus}
                                  </p>
                                </div>
                              </div>
                              <div className="space-y-3">
                                <h5 className="font-semibold text-foreground">
                                  Delivery Address
                                </h5>
                                <div className="text-sm space-y-1">
                                  <p className="font-medium">
                                    {order.orderInfo.firstName}{' '}
                                    {order.orderInfo.lastName}
                                  </p>
                                  <p>{order.orderInfo.address.line1}</p>
                                  {order.orderInfo.address.line2 && (
                                    <p>{order.orderInfo.address.line2}</p>
                                  )}
                                  <p>
                                    {order.orderInfo.address.city},{' '}
                                    {order.orderInfo.address.state}{' '}
                                    {order.orderInfo.address.postalCode}
                                  </p>
                                  <p>{order.orderInfo.address.country}</p>
                                  <p className="pt-1 text-muted-foreground">
                                    📞 {order.orderInfo.phone}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </Container>
  );
}

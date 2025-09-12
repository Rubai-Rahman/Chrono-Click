'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  MessageCircle,
  Badge,
  Clock,
  CreditCard,
} from 'lucide-react';
import Image from 'next/image';
import { useOrderStore } from '@/store/useOrderStore';

const OrderSuccessPageContent = () => {
  const lastOrder = useOrderStore((state) => state.lastOrder);
  console.log('lastOrder', lastOrder);
  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4">
        {/* Success Header */}
        <div className="text-center my-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in-up">
            Order Confirmed!
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up animation-delay-200">
            Thank you for your purchase! We&apos;ve received your order and will
            send you a confirmation email shortly.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {lastOrder && (
            <OrderDetails
              orderNumber={lastOrder?.orderCode}
              items={lastOrder.orderItems.map((item) => ({
                id: item.productId, // map productId -> id
                name: item.name, // already exists
                price: item.price,
                quantity: item.quantity,
                image: item.image,
              }))}
              subtotal={lastOrder?.subtotal}
              shipping={lastOrder?.shipping}
              tax={lastOrder?.tax}
              total={lastOrder?.total}
              estimatedDelivery="3-5 Business Days"
              paymentMethod={lastOrder?.paymentMethod}
              address={`${lastOrder?.orderInfo.address.line1}, ${
                lastOrder?.orderInfo.address.line2 || ''
              }, ${lastOrder?.orderInfo.address.city}, ${
                lastOrder?.orderInfo.address.state
              }, ${lastOrder?.orderInfo.address.postalCode}, ${
                lastOrder?.orderInfo.address.country
              }`}
              customer={`${lastOrder?.orderInfo.firstName} ${lastOrder?.orderInfo.lastName}`}
              phone={lastOrder?.orderInfo.phone}
              email={lastOrder?.orderInfo.email}
            />
          )}
          {lastOrder && <DeliveryTimeline order={lastOrder} />}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in-up animation-delay-700 shadow-elegant hover:shadow-success transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Package className="h-12 w-12 text-success mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Track Your Order</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get real-time updates on your delivery
              </p>
              <Button size="sm" className="w-full">
                Track Package
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up animation-delay-800 shadow-elegant hover:shadow-success transition-all duration-300">
            <CardContent className="p-6 text-center">
              <MessageCircle className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our support team is here to assist you
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Contact Support
              </Button>
            </CardContent>
          </Card>

          <Card className="animate-fade-in-up animation-delay-900 shadow-elegant hover:shadow-success transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="h-12 w-12 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <ArrowRight className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="font-semibold mb-2">Continue Shopping</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Discover more amazing products
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/">Shop More</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Footer Message */}
        <div className="text-center animate-fade-in-up animation-delay-1000">
          <p className="text-muted-foreground">
            Questions about your order? Email us at{' '}
            <a
              href="mailto:support@example.com"
              className="text-success hover:underline font-medium"
            >
              support@example.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Truck, Package, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FrontendOrder } from '@/lib/types/api/order-type';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface DeliveryTimelineProps {
  order: FrontendOrder;
}

const DeliveryTimeline = ({ order }: DeliveryTimelineProps) => {
  const steps = [
    {
      id: 'confirmed',
      title: 'Order Confirmed',
      description: "We've received your order and payment",
      completed: true, // Always true if we have an order
      icon: <CheckCircle className="h-5 w-5" />,
      estimatedDate: new Date(order.createdAt).toLocaleString(),
    },
    {
      id: 'processing',
      title: 'Processing',
      description: 'Your order is being prepared',
      completed: ['processing', 'shipped', 'delivered'].includes(order.status),
      icon: <Package className="h-5 w-5" />,
    },
    {
      id: 'shipped',
      title: 'Shipped',
      description: 'Your order is on its way',
      completed: ['shipped', 'delivered'].includes(order.status),
      icon: <Truck className="h-5 w-5" />,
      estimatedDate:
        order.status === 'shipped'
          ? new Date().toLocaleDateString() // You can replace with real shipment date
          : undefined,
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Your order will arrive at your doorstep',
      completed: order.status === 'delivered',
      icon: <Home className="h-5 w-5" />,
      estimatedDate:
        order.status === 'delivered'
          ? new Date().toLocaleDateString()
          : '3-5 business days',
    },
  ];

  return (
    <Card className="animate-fade-in-up animation-delay-500 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5 text-success" />
          Delivery Timeline
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-start gap-4">
              {/* Icon */}
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300',
                  step.completed
                    ? 'bg-success text-success-foreground border-success animate-scale-in'
                    : 'bg-background text-muted-foreground border-border'
                )}
              >
                {step.completed ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  step.icon
                )}
              </div>

              {/* Content */}
              <div className="flex-1 pb-6">
                <div className="flex items-center justify-between">
                  <h4
                    className={cn(
                      'font-semibold transition-colors',
                      step.completed ? 'text-success' : 'text-foreground'
                    )}
                  >
                    {step.title}
                  </h4>
                  {step.estimatedDate && (
                    <span className="text-sm text-muted-foreground">
                      {step.estimatedDate}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {step.description}
                </p>

                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      'w-0.5 h-6 mt-4 ml-5 transition-colors duration-300',
                      step.completed ? 'bg-success' : 'bg-border'
                    )}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface OrderDetailsProps {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedDelivery: string;
  paymentMethod: string;

  // New fields
  address: string;
  customer: string;
  phone: string;
  email: string;
}

const OrderDetails = ({
  orderNumber,
  items,
  subtotal,
  shipping,
  tax,
  total,
  estimatedDelivery,
  paymentMethod,
  address,
  customer,
  phone,
  email,
}: OrderDetailsProps) => {
  return (
    <Card className="animate-fade-in-up animation-delay-300 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-success" />
          Order Details
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Order #{orderNumber}</span>
          <Badge className="bg-success-light text-success">Confirmed</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-2"
            >
              <div className="flex items-center gap-3">
                {item.image ? (
                  <Image
                    width={30}
                    height={30}
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>
              <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <Separator />

        {/* Customer Info */}
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold">Customer Information</h4>
          <p>
            <span className="font-medium">Name:</span> {customer}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {phone}
          </p>
          <p>
            <span className="font-medium">Email:</span> {email}
          </p>
        </div>

        <Separator />

        {/* Shipping Address */}
        <div className="space-y-2 text-sm">
          <h4 className="font-semibold">Shipping Address</h4>
          <p>{address}</p>
        </div>

        <Separator />

        {/* Estimated Delivery & Payment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Estimated Delivery</p>
              <p className="text-muted-foreground">{estimatedDelivery}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="font-medium">Payment Method</p>
              <p className="text-muted-foreground">{paymentMethod}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default OrderSuccessPageContent;

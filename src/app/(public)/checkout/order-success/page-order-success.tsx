import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  MessageCircle,
  Badge,
  Clock,
  CreditCard,
} from 'lucide-react';

const mockOrder = {
  orderNumber: 'ORD-2024-001234',
  items: [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      quantity: 1,
      price: 299.99,
    },
    {
      id: '2',
      name: 'Bluetooth Speaker',
      quantity: 2,
      price: 89.99,
    },
  ],
  subtotal: 479.97,
  shipping: 15.0,
  tax: 39.6,
  total: 534.57,
  estimatedDelivery: 'December 28, 2024',
  paymentMethod: '•••• •••• •••• 4242',
};

const OrderSuccessPageContent = () => {
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
          <OrderDetails {...mockOrder} />
          <DeliveryTimeline />
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
              <Button size="sm" className="w-full">
                Shop More
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
import { Separator } from '@/components/ui/separator';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  icon: React.ReactNode;
  estimatedDate?: string;
}

const timelineSteps: TimelineStep[] = [
  {
    id: 'confirmed',
    title: 'Order Confirmed',
    description: "We've received your order and payment",
    completed: true,
    icon: <CheckCircle className="h-5 w-5" />,
  },
  {
    id: 'processing',
    title: 'Processing',
    description: 'Your order is being prepared',
    completed: false,
    icon: <Package className="h-5 w-5" />,
    estimatedDate: 'Today, 3:00 PM',
  },
  {
    id: 'shipped',
    title: 'Shipped',
    description: 'Your order is on its way',
    completed: false,
    icon: <Truck className="h-5 w-5" />,
    estimatedDate: 'Tomorrow, 10:00 AM',
  },
  {
    id: 'delivered',
    title: 'Delivered',
    description: 'Your order will arrive at your doorstep',
    completed: false,
    icon: <Home className="h-5 w-5" />,
    estimatedDate: 'Dec 28, 2024',
  },
];

const DeliveryTimeline = () => {
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
          {timelineSteps.map((step, index) => (
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
                {index < timelineSteps.length - 1 && (
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
}: OrderDetailsProps) => {
  return (
    <Card className="animate-fade-in-up animation-delay-300 shadow-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-success" />
          Order Details
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Order #{orderNumber}</span>
          </div>
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
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
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

        {/* Additional Info */}
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

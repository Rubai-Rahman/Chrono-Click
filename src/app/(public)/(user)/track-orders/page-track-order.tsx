'use client'
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  Package,
  Circle,
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Search, AlertCircle, Phone, Mail } from 'lucide-react';
import {} from 'lucide-react';

interface TrackingData {
  orderNumber: string;
  trackingNumber: string;
  status:
    | 'processing'
    | 'shipped'
    | 'in-transit'
    | 'out-for-delivery'
    | 'delivered';
  estimatedDelivery: string;
  currentLocation: string;
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }>;
  timeline: Array<{
    id: string;
    status: string;
    description: string;
    timestamp: string;
    location?: string;
    isCompleted: boolean;
  }>;
}

const mockTrackingData: TrackingData = {
  orderNumber: 'ORD-2024-001234',
  trackingNumber: '1Z999AA1234567890',
  status: 'in-transit',
  estimatedDelivery: 'Today by 8:00 PM',
  currentLocation: 'Distribution Center - New York, NY',
  items: [
    {
      id: '1',
      name: 'Premium Wireless Headphones',
      image: '/api/placeholder/80/80',
      price: 299.99,
      quantity: 1,
    },
    {
      id: '2',
      name: 'USB-C Charging Cable',
      image: '/api/placeholder/80/80',
      price: 29.99,
      quantity: 2,
    },
  ],
  timeline: [
    {
      id: '1',
      status: 'Order Placed',
      description: 'Your order has been placed successfully',
      timestamp: 'Dec 18, 2024 - 2:30 PM',
      isCompleted: true,
    },
    {
      id: '2',
      status: 'Processing',
      description: 'Order is being prepared for shipment',
      timestamp: 'Dec 18, 2024 - 4:15 PM',
      isCompleted: true,
    },
    {
      id: '3',
      status: 'Shipped',
      description: 'Package has been shipped from our warehouse',
      timestamp: 'Dec 19, 2024 - 9:00 AM',
      location: 'Warehouse - San Francisco, CA',
      isCompleted: true,
    },
    {
      id: '4',
      status: 'In Transit',
      description: 'Package is on its way to the destination',
      timestamp: 'Dec 20, 2024 - 11:30 AM',
      location: 'Distribution Center - New York, NY',
      isCompleted: true,
    },
    {
      id: '5',
      status: 'Out for Delivery',
      description: 'Package is out for delivery',
      timestamp: 'Expected: Dec 21, 2024',
      isCompleted: false,
    },
    {
      id: '6',
      status: 'Delivered',
      description: 'Package has been delivered',
      timestamp: 'Expected: Dec 21, 2024 by 8:00 PM',
      isCompleted: false,
    },
  ],
};

export const TrackOrderPageContent = () => {
  const [trackingInput, setTrackingInput] = useState('');
  const [trackingData, setTrackingData] = useState<TrackingData | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTrackOrder = async () => {
    if (!trackingInput.trim()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingData(mockTrackingData);
      setIsLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing':
        return 'bg-warning text-warning-foreground';
      case 'shipped':
        return 'bg-primary text-primary-foreground';
      case 'in-transit':
        return 'bg-primary text-primary-foreground';
      case 'out-for-delivery':
        return 'bg-accent text-accent-foreground';
      case 'delivered':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Package className="h-4 w-4" />;
      case 'shipped':
        return <Truck className="h-4 w-4" />;
      case 'in-transit':
        return <Truck className="h-4 w-4" />;
      case 'out-for-delivery':
        return <MapPin className="h-4 w-4" />;
      case 'delivered':
        return <CheckCircle2 className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-card-foreground">
            Track Your Order
          </h1>
          <p className="text-muted-foreground text-lg">
            Enter your order number or tracking number to get real-time updates
          </p>
        </div>

        {/* Search Section */}
        <Card className="shadow-card animate-scale-in">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Enter order number or tracking number..."
                  value={trackingInput}
                  onChange={(e) => setTrackingInput(e.target.value)}
                  className="pl-10"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                />
              </div>
              <Button
                onClick={handleTrackOrder}
                disabled={isLoading || !trackingInput.trim()}
                className="bg-gradient-primary hover:opacity-90 transition-opacity"
              >
                {isLoading ? 'Tracking...' : 'Track Order'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-6 animate-fade-in-up">
            {/* Status Overview */}
            <Card className="shadow-elegant bg-gradient-card">
              <CardHeader className="pb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <CardTitle className="text-2xl">
                      Order #{trackingData.orderNumber}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Tracking: {trackingData.trackingNumber}
                    </p>
                  </div>
                  <Badge
                    className={`${getStatusColor(
                      trackingData.status
                    )} px-4 py-2 text-sm font-semibold`}
                  >
                    {getStatusIcon(trackingData.status)}
                    <span className="ml-2 capitalize">
                      {trackingData.status.replace('-', ' ')}
                    </span>
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-accent" />
                      <span className="font-semibold">Estimated Delivery</span>
                    </div>
                    <p className="text-xl font-bold text-success">
                      {trackingData.estimatedDelivery}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span className="font-semibold">Current Location</span>
                    </div>
                    <p className="text-lg">{trackingData.currentLocation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Stepper */}
            <OrderProgressStepper timeline={trackingData.timeline} />

            {/* Order Details and Timeline */}
            <div className="grid lg:grid-cols-2 gap-6">
              <OrderDetails
                items={trackingData.items}
                orderNumber={trackingData.orderNumber}
              />
              <DeliveryTimeline timeline={trackingData.timeline} />
            </div>

            {/* Contact Support */}
            <Card className="bg-muted/50">
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-4">Need Help?</h3>
                <div className="flex flex-col md:flex-row gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Support
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email Support
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

interface TimelineItem {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  location?: string;
  isCompleted: boolean;
}

interface OrderProgressStepperProps {
  timeline: TimelineItem[];
}

const OrderProgressStepper = ({ timeline }: OrderProgressStepperProps) => {
  const getStepIcon = (
    status: string,
    isCompleted: boolean,
    isActive: boolean
  ) => {
    const iconProps = {
      className: `h-5 w-5 ${
        isCompleted
          ? 'text-success-foreground'
          : isActive
          ? 'text-primary-foreground'
          : 'text-muted-foreground'
      }`,
    };

    switch (status.toLowerCase()) {
      case 'order placed':
        return isCompleted ? (
          <CheckCircle2 {...iconProps} />
        ) : (
          <Circle {...iconProps} />
        );
      case 'processing':
        return isCompleted ? (
          <CheckCircle2 {...iconProps} />
        ) : (
          <Package {...iconProps} />
        );
      case 'shipped':
        return isCompleted ? (
          <CheckCircle2 {...iconProps} />
        ) : (
          <Truck {...iconProps} />
        );
      case 'in transit':
        return isCompleted ? (
          <CheckCircle2 {...iconProps} />
        ) : (
          <Truck {...iconProps} />
        );
      case 'out for delivery':
        return isCompleted ? (
          <CheckCircle2 {...iconProps} />
        ) : (
          <MapPin {...iconProps} />
        );
      case 'delivered':
        return isCompleted ? (
          <CheckCircle2 {...iconProps} />
        ) : (
          <CheckCircle2 {...iconProps} className="text-muted-foreground" />
        );
      default:
        return <Clock {...iconProps} />;
    }
  };

  // Find the current active step (first non-completed step)
  const activeStepIndex = timeline.findIndex((item) => !item.isCompleted);

  return (
    <div className="w-full bg-card rounded-xl shadow-card p-6 animate-scale-in">
      <h3 className="font-semibold text-xl mb-6 text-card-foreground">
        Order Progress
      </h3>

      {/* Desktop Progress Bar */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-border transform -translate-y-1/2 z-0">
            <div
              className="h-full bg-gradient-success transition-all duration-1000 ease-out animate-progress-fill"
              style={{
                width: `${
                  ((timeline.filter((item) => item.isCompleted).length - 1) /
                    (timeline.length - 1)) *
                  100
                }%`,
              }}
            />
          </div>

          {/* Steps */}
          {timeline.map((item, index) => {
            const isActive = activeStepIndex === index;

            return (
              <div
                key={item.id}
                className="flex flex-col items-center relative z-10"
              >
                {/* Step Circle */}
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                  ${
                    item.isCompleted
                      ? 'bg-success shadow-progress animate-pulse-success'
                      : isActive
                      ? 'bg-primary shadow-elegant'
                      : 'bg-muted border-2 border-border'
                  }
                `}
                >
                  {getStepIcon(item.status, item.isCompleted, isActive)}
                </div>

                {/* Step Label */}
                <div className="mt-3 text-center max-w-[120px]">
                  <p
                    className={`font-medium text-sm ${
                      item.isCompleted
                        ? 'text-success'
                        : isActive
                        ? 'text-primary'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {item.status}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.timestamp.split(' - ')[0]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Progress Steps */}
      <div className="md:hidden space-y-4">
        {timeline.map((item, index) => {
          const isActive = activeStepIndex === index;

          return (
            <div key={item.id} className="flex items-start gap-4">
              {/* Step Indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                  ${
                    item.isCompleted
                      ? 'bg-success shadow-progress'
                      : isActive
                      ? 'bg-primary shadow-elegant'
                      : 'bg-muted border-2 border-border'
                  }
                `}
                >
                  {getStepIcon(item.status, item.isCompleted, isActive)}
                </div>
                {index < timeline.length - 1 && (
                  <div
                    className={`w-0.5 h-8 mt-2 transition-colors duration-300 ${
                      item.isCompleted ? 'bg-success' : 'bg-border'
                    }`}
                  />
                )}
              </div>

              {/* Step Content */}
              <div className="flex-1 pb-6">
                <h4
                  className={`font-medium ${
                    item.isCompleted
                      ? 'text-success'
                      : isActive
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.status}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.description}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {item.timestamp}
                </p>
                {item.location && (
                  <p className="text-xs text-accent mt-1">📍 {item.location}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

interface OrderItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface OrderDetailsProps {
  items: OrderItem[];
  orderNumber: string;
}

const OrderDetails = ({ items, orderNumber }: OrderDetailsProps) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <Card className="shadow-card animate-fade-in-up">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span>Order Details</span>
          <span className="text-sm font-normal text-muted-foreground">
            ({items.length} items)
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order Items */}
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg transition-colors hover:bg-muted/70"
            >
              <div className="w-16 h-16 bg-background rounded-lg border border-border flex items-center justify-center">
                <span className="text-2xl">📦</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-card-foreground truncate">
                  {item.name}
                </h4>
                <p className="text-sm text-muted-foreground">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-card-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">
                  ${item.price.toFixed(2)} each
                </p>
              </div>
            </div>
          ))}
        </div>

        <Separator />

        {/* Order Summary */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-card-foreground">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-success font-medium">FREE</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="text-card-foreground">${tax.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span className="text-card-foreground">Total</span>
            <span className="text-primary">${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-6 p-4 bg-success-light/20 border border-success/20 rounded-lg">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Number</span>
              <span className="font-mono text-card-foreground">
                {orderNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Order Date</span>
              <span className="text-card-foreground">Dec 18, 2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Payment Method</span>
              <span className="text-card-foreground">•••• •••• •••• 4242</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface TimelineItem {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  location?: string;
  isCompleted: boolean;
}

interface DeliveryTimelineProps {
  timeline: TimelineItem[];
}

const DeliveryTimeline = ({ timeline }: DeliveryTimelineProps) => {
  const getStatusIcon = (status: string, isCompleted: boolean) => {
    const iconClass = `h-4 w-4 ${
      isCompleted ? 'text-success' : 'text-muted-foreground'
    }`;

    switch (status.toLowerCase()) {
      case 'order placed':
        return <Package className={iconClass} />;
      case 'processing':
        return <Clock className={iconClass} />;
      case 'shipped':
        return <Truck className={iconClass} />;
      case 'in transit':
        return <Truck className={iconClass} />;
      case 'out for delivery':
        return <MapPin className={iconClass} />;
      case 'delivered':
        return <CheckCircle2 className={iconClass} />;
      default:
        return <Clock className={iconClass} />;
    }
  };

  const getStatusBadge = (status: string, isCompleted: boolean) => {
    if (isCompleted) {
      return (
        <Badge className="bg-success text-success-foreground">Completed</Badge>
      );
    }

    return <Badge variant="secondary">Pending</Badge>;
  };

  return (
    <Card className="shadow-card animate-fade-in-up">
      <CardHeader>
        <CardTitle>Delivery Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-6">
            {timeline.map((item, index) => (
              <div key={item.id} className="relative flex items-start gap-4">
                {/* Timeline Dot */}
                <div
                  className={`
                  relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4
                  ${
                    item.isCompleted
                      ? 'bg-success border-success-light shadow-progress'
                      : index === timeline.findIndex((t) => !t.isCompleted)
                      ? 'bg-primary border-primary-light shadow-elegant animate-pulse-success'
                      : 'bg-muted border-border'
                  }
                `}
                >
                  {item.isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-success-foreground" />
                  ) : (
                    getStatusIcon(item.status, item.isCompleted)
                  )}
                </div>

                {/* Timeline Content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h4
                      className={`font-semibold ${
                        item.isCompleted
                          ? 'text-success'
                          : 'text-card-foreground'
                      }`}
                    >
                      {item.status}
                    </h4>
                    {getStatusBadge(item.status, item.isCompleted)}
                  </div>

                  <p className="text-sm text-muted-foreground mb-2">
                    {item.description}
                  </p>

                  <div className="space-y-1">
                    <p className="text-xs font-medium text-card-foreground">
                      {item.timestamp}
                    </p>
                    {item.location && (
                      <div className="flex items-center gap-1 text-xs text-accent">
                        <MapPin className="h-3 w-3" />
                        <span>{item.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Additional Details for Active Step */}
                  {index === timeline.findIndex((t) => !t.isCompleted) &&
                    !item.isCompleted && (
                      <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                          <span className="text-sm font-medium text-primary">
                            Currently in progress
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          We&apos;ll update you as soon as there&apos;s any
                          change in status.
                        </p>
                      </div>
                    )}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline End */}
          <div className="relative flex items-center gap-4 mt-4">
            <div className="w-12 h-12 rounded-full bg-muted border-4 border-border flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-muted-foreground" />
            </div>
            <div className="text-sm text-muted-foreground">
              End of tracking timeline
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

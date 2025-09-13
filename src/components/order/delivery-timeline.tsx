import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  CheckCircle,
  Truck,
  Package,
  Home,
  Clock,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FrontendOrder } from '@/lib/types/api/order-type';

interface DeliveryTimelineProps {
  order: FrontendOrder;
}

const DeliveryTimeline = ({ order }: DeliveryTimelineProps) => {
  const steps = [
    {
      id: 'pending',
      title: 'Order Pending',
      description: "We've received your order request",
      completed: ['processing', 'shipped', 'delivered'].includes(order.status),
      icon: <Clock className="h-5 w-5" />,
      estimatedDate:
        order.status === 'pending'
          ? new Date(order.createdAt).toLocaleString()
          : undefined,
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
          ? new Date().toLocaleDateString()
          : undefined,
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Your order has been delivered',
      completed: order.status === 'delivered',
      icon: <Home className="h-5 w-5" />,
      estimatedDate:
        order.status === 'delivered'
          ? new Date().toLocaleDateString()
          : '3-5 business days',
    },
    {
      id: 'cancelled',
      title: 'Cancelled',
      description: 'Your order was cancelled',
      completed: order.status === 'cancelled',
      icon: <XCircle className="h-5 w-5" />,
      estimatedDate:
        order.status === 'cancelled'
          ? new Date().toLocaleDateString()
          : undefined,
    },
    {
      id: 'returned',
      title: 'Returned',
      description: 'Your order was returned',
      completed: order.status === 'returned',
      icon: <RotateCcw className="h-5 w-5" />,
      estimatedDate:
        order.status === 'returned'
          ? new Date().toLocaleDateString()
          : undefined,
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

export default DeliveryTimeline;

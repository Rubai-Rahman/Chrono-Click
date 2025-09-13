'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, MessageCircle, Package } from 'lucide-react';
import { useOrderStore } from '@/store/useOrderStore';
import DeliveryTimeline from '@/components/order/delivery-timeline';
import OrderInfo from '@/components/order/order-info';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

const OrderSuccessPageContent = () => {
  const lastOrder = useOrderStore((state) => state.lastOrder);

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
            <OrderInfo
              orderNumber={lastOrder?.orderCode}
              items={lastOrder.orderItems.map((item) => ({
                id: item.productId._id || item.productId.id,
                name: item.name,
                price: item.price ?? 0,
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
              <h3 className="font-semibold mb-2">View All Your Order</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get real-time updates on your delivery
              </p>
              <Button asChild size="sm" className="w-full">
                <Link href="/orders">
                  All Order
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
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
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href="/contact">Contact Support</Link>
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
      </div>
    </div>
  );
};

export default OrderSuccessPageContent;

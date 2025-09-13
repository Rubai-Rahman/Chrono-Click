'use client';

import OrderInfo from '@/components/order/order-info';
import { FrontendOrder } from '@/lib/types/api/order-type';
import DeliveryTimeline from '@/components/order/delivery-timeline';
import Container from '@/components/layout/container';

const OrderDetailsContent = ({
  orderDetails,
}: {
  orderDetails: FrontendOrder;
}) => {
  const items = orderDetails.orderItems.map((item) => ({
    id: item._id,
    name: item.productId.name,
    quantity: item.quantity,
    price: item.productId.price,
    image: item.productId.img,
  }));

  // Format address into a single string
  const address = `${orderDetails.orderInfo.address.line1}, ${orderDetails.orderInfo.address.line2}, ${orderDetails.orderInfo.address.city}, ${orderDetails.orderInfo.address.state}, ${orderDetails.orderInfo.address.postalCode}, ${orderDetails.orderInfo.address.country}`;

  // Full customer name
  const customer = `${orderDetails.orderInfo.firstName} ${orderDetails.orderInfo.lastName}`;

  // Estimated delivery: could be dynamic, but using placeholder
  const estimatedDelivery = '3-5 business days';
  return (
    <Container>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
        <div className="text-center sm:mb-16 bg-gradient-to-l from-primary/30 to-card p-3 rounded-md">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text  mb-2">
            Order Details
          </h1>
          <p className="text-muted-foreground text-lg">
            Track your order and view details below
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <div className="order-2 lg:order-1 flex flex-col">
            <OrderInfo
              orderNumber={orderDetails.orderCode}
              items={items}
              subtotal={orderDetails.subtotal}
              shipping={orderDetails.shipping}
              tax={orderDetails.tax}
              total={orderDetails.total}
              estimatedDelivery={estimatedDelivery}
              paymentMethod={orderDetails.paymentMethod}
              address={address}
              customer={customer}
              phone={orderDetails.orderInfo.phone}
              email={orderDetails.orderInfo.email}
            />
          </div>

          <div className="order-1 lg:order-2 flex flex-col">
            <DeliveryTimeline order={orderDetails} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default OrderDetailsContent;

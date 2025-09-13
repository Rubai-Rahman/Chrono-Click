import { Badge, Clock, CreditCard, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import Image from 'next/image';
import { Separator } from '../ui/separator';

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}
interface OrderInfoProps {
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  estimatedDelivery: string;
  paymentMethod: string;
  address: string;
  customer: string;
  phone: string;
  email: string;
}
const OrderInfo = ({
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
}: OrderInfoProps) => {
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

export default OrderInfo;

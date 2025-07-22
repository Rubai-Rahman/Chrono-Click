import { OrderType } from '@/app/dashboard/myOrders/page-myOrders';

export const sampleOrders: OrderType[] = [
  {
    _id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15T10:30:00Z',
    status: 'delivered',
    total: 299.99,
    items: [
      {
        _id: '1',
        name: 'Premium Wireless Headphones',
        price: 299.99,
        quantity: 1,
        img: '/default.webp',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      zipCode: '10001',
      country: 'United States',
    },
    paymentMethod: 'Credit Card',
    trackingNumber: 'TRK123456789',
  },
  {
    _id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-20T14:15:00Z',
    status: 'shipped',
    total: 199.99,
    items: [
      {
        _id: '2',
        name: 'Smart Fitness Watch',
        price: 199.99,
        quantity: 1,
        img: '/default.webp',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      zipCode: '10001',
      country: 'United States',
    },
    paymentMethod: 'PayPal',
    trackingNumber: 'TRK987654321',
  },
  {
    _id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-25T09:45:00Z',
    status: 'processing',
    total: 1349.98,
    items: [
      {
        _id: '3',
        name: 'Professional Camera Lens',
        price: 899.99,
        quantity: 1,
        img: '/default.webp',
      },
      {
        _id: '4',
        name: 'Ergonomic Office Chair',
        price: 449.99,
        quantity: 1,
        img: '/default.webp',
      },
    ],
    shippingAddress: {
      name: 'John Doe',
      address: '123 Main Street, Apt 4B',
      city: 'New York',
      zipCode: '10001',
      country: 'United States',
    },
    paymentMethod: 'Credit Card',
  },
];

export const getMockOrders = (): OrderType[] => {
  return sampleOrders;
};

export const getMockOrder = (id: string): OrderType | undefined => {
  return sampleOrders.find((order) => order._id === id);
};

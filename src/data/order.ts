export interface CartProduct {
  _id: string;
  name: string;
  price: number;
  img: string;
  qty: number;
  status: string;
  // Add other properties of your product here
}

export interface OrderData {
  email: string | undefined;
  cart: CartProduct[];
}

export interface OrderItem {
  _id: string;
  email: string;
  cart: CartProduct[];
}

export const placeOrder = async (orderData: OrderData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    throw new Error('Failed to place order');
  }
  return res.json();
};

export const fetchOrders = async (
  email: string | undefined
): Promise<CartProduct[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders?email=${email}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }
  return res.json();
};

export const fetchAllOrders = async (): Promise<OrderItem[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/orders`);
  if (!res.ok) {
    throw new Error('Failed to fetch all orders');
  }
  return res.json();
};

export const deleteOrder = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/orders/${id}`,
    {
      method: 'DELETE',
    }
  );
  if (!res.ok) {
    throw new Error('Failed to delete order');
  }
  return res.json();
};

'use client'; // This component uses client-side hooks

import { useAuth } from '@/Contexts/AuthProvider/AuthProvider';
import Image from 'next/image';
import { Trash2 } from 'lucide-react'; // Using lucide-react
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchOrders, deleteOrder, OrderItem } from '@/api-lib/orders';

const MyOrdersPageContent = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery<OrderItem[], Error>({
    queryKey: ['myOrders', user?.email],
    queryFn: () => fetchOrders(user?.email),
    enabled: !!user?.email, // Only run query if user email is available
  });

  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      alert('All The Item of This Cart is Deleted '); // Consider using a more user-friendly notification
      queryClient.invalidateQueries({ queryKey: ['myOrders'] }); // Invalidate myOrders cache
    },
    onError: (err) => {
      console.error('Error deleting order:', err);
    },
  });

  const handleDelete = (id: string) => {
    deleteOrderMutation.mutate(id);
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error?.message}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {orders && orders.length === 0 ? (
          <p className="p-4 text-center text-gray-600">No orders found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {orders?.map((order) => (
              <li key={order._id} className="p-4">
                <h2 className="text-xl font-semibold mb-2">
                  Order ID: {order._id}
                </h2>
                {order.cart.map((item) => (
                  <div key={item._id} className="flex items-center py-2">
                    <div className="w-16 h-16 mr-4 flex-shrink-0">
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-gray-600">${item.price}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                        {item.status}
                      </button>
                      <Trash2
                        className="text-red-500 cursor-pointer text-lg"
                        onClick={() => handleDelete(order._id)}
                      />
                    </div>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyOrdersPageContent;

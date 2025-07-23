import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, ProductType } from '@/api-lib/api-type';

interface CartStore {
  items: CartItem[];
  addToCart: (item: ProductType) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (item) =>
        set((state) => {
          const existingItem = state.items.find((i) => i._id === item._id);
          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i._id === item._id
                  ? { ...i, quantity: (i.quantity || 1) + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { ...item, quantity: 1 }] };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item._id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item._id === id ? { ...item, quantity } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      totalPrice: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * (item.quantity || 1),
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

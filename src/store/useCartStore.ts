import { create } from 'zustand';
import { ProductDetailsItem } from '@/api-lib/products';

type CartState = {
  items: ProductDetailsItem[];
  addToCart: (item: ProductDetailsItem) => void;
  removeFromCart: (_id: string) => void;
  totalPrice: () => number;
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  addToCart: (item) => {
    const existing = get().items.find((p) => p._id === item._id);
    if (!existing) {
      set((state) => ({
        items: [...state.items, item],
      }));
    }
  },
  removeFromCart: (_id) => {
    set((state) => ({
      items: state.items.filter((p) => p._id !== _id),
    }));
  },
  totalPrice: () => {
    return get().items.reduce((acc, curr) => acc + Number(curr.price), 0);
  },
}));

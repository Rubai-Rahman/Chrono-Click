import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ProductType } from '@/lib/types/api/product-types';

type WishlistState = {
  items: ProductType[];
  addToWishlist: (product: ProductType) => void;
  removeFromWishlist: (productId: string | number) => void;
  isInWishlist: (productId: string | number) => boolean;
  clearWishlist: () => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      addToWishlist: (product) =>
        set((state) => {
          const exists = state.items.some((item) => item.id === product.id);
          if (!exists) {
            return { items: [...state.items, product] };
          }
          return state;
        }),
      removeFromWishlist: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),
      isInWishlist: (productId) =>
        get().items.some((item) => item.id === productId),
      clearWishlist: () => set({ items: [] }),
    }),
    {
      name: 'wishlist-storage', // unique name for localStorage key
    }
  )
);

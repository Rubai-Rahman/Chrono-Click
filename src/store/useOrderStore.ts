// src/store/orderStore.ts
import { FrontendOrder } from '@/lib/types/api/order-type';
import { create } from 'zustand';

interface OrderState {
  lastOrder: FrontendOrder | null;
  setLastOrder: (order: FrontendOrder) => void;
  clearLastOrder: () => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  lastOrder: null,
  setLastOrder: (order: FrontendOrder) => set({ lastOrder: order }),
  clearLastOrder: () => set({ lastOrder: null }),
}));

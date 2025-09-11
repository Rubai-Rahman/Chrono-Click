// src/context/CheckoutContext.tsx
'use client';
import React, { createContext, useContext, useState } from 'react';
import type { TAddress } from '@/lib/types/api/address-types';
import type { CheckoutFormData } from '@/components/checkout/checkout-form';

interface CheckoutContextType {
  addresses: TAddress[];
  setAddresses: React.Dispatch<React.SetStateAction<TAddress[]>>;
  shippingMethod: string;
  setShippingMethod: (m: string) => void;
  // possibly include form submission / handler etc
}

const CheckoutContext = createContext<CheckoutContextType | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [addresses, setAddresses] = useState<TAddress[]>([]);
  const [shippingMethod, setShippingMethod] = useState<string>('standard');

  return (
    <CheckoutContext.Provider
      value={{
        addresses,
        setAddresses,
        shippingMethod,
        setShippingMethod,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckout() {
  const ctx = useContext(CheckoutContext);
  if (!ctx) throw new Error('useCheckout must be used within CheckoutProvider');
  return ctx;
}

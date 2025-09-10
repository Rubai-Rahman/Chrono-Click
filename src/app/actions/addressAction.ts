'use server';

import { placeAddress, updateAddress, deleteAddress } from '@/data/address';
import { TAddress } from '@/lib/types/api/address-types';
import { revalidateTag } from 'next/cache';

export async function deleteAddressAction(id: string) {
  const result = await deleteAddress(id);
  if (result.success) {
    revalidateTag('addresses'); 
  }
  return result;
}

export async function createAddressAction(data: TAddress) {
  const result = await placeAddress(data);
  if (result.success) {
    revalidateTag('addresses');
  }
  return result;
}

export async function updateAddressAction(data: TAddress, id: string) {
  const result = await updateAddress(data, id);
  if (result.success) {
    revalidateTag('addresses');
  }
  return result;
}

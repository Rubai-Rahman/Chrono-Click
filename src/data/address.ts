// data/address.ts
import { TAddress } from '@/lib/types/api/address-types';
import { requireSession } from './dal';
import { ApiResult, safeApi } from '@/lib/fetch';

// Create
export const placeAddress = async (
  address: TAddress
): Promise<ApiResult<TAddress>> => {
  await requireSession();
  return safeApi.post<TAddress>('address/create', address, {
    next: { tags: ['addresses'] },
  });
};

// Update
export const updateAddress = async (
  address: TAddress,
  _id: string
): Promise<ApiResult<TAddress>> => {
  await requireSession();
  return safeApi.put<TAddress>(`address/update/${_id}`, address, {
    next: { tags: ['addresses'] },
  });
};

// Delete
export const deleteAddress = async (
  _id: string
): Promise<ApiResult<TAddress>> => {
  await requireSession();
  return safeApi.delete<TAddress>(`address/delete/${_id}`, {
    next: { tags: ['addresses'] },
  });
};

// Fetch all
export const fetchAllAddresses = async (): Promise<ApiResult<TAddress[]>> => {
  await requireSession();
  return safeApi.get<TAddress[]>('address/all', {
    next: { tags: ['addresses'] },
  });
};

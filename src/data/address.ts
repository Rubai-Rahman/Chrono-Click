import { safeApi } from '@/lib/fetch';
import { TAddress } from '@/lib/types/api/address-types';
import { requireSession } from './dal';

export const placeAddress = async (address: TAddress) => {
  await requireSession();
  try {
    const result = await safeApi.post<TAddress>('address/create', address, {
      next: {
        tags: ['addresses'],
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};

export const fetchAllAddresses = async () => {
  await requireSession();
  try {
    const result = await safeApi.get<TAddress[]>('address/all', {
      next: {
        revalidate: 6000,
        tags: ['addresses'],
      },
    });
    return result.data;
  } catch (error) {
    return error;
  }
};

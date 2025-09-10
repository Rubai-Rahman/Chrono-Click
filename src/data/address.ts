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

export const fetchAllAddresses = async <T>(
  path: string,
  opts?: { next?: { revalidate?: number | false; tags?: string[] } }
): Promise<T | null> => {
  await requireSession();
  try {
    const result = await safeApi.get<T>(path, {
      next: {
        revalidate: opts?.next?.revalidate,
        tags: opts?.next?.tags ?? ['addresses'],
      },
    });
    return result.data;
  } catch (error) {
    console.error('Failed to fetch addresses:', error);
    return null;
  }
};

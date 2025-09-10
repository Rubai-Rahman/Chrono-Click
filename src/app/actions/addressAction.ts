'use server';

import { placeAddress } from '@/data/address';
import { TAddress } from '@/lib/types/api/address-types';

export async function addressAction(address: TAddress) {
  const result = await placeAddress(address);
  if (!result) {
    return {
      success: false,
      error: {
        message: 'Failed to place address',
        status: 'error',
        details: 'Failed to place address',
      },
    };
  }

  return { success: true, data: result };
}

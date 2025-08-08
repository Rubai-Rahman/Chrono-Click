import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Helper function to validate URLs
export function isValidUrl(url: string): boolean {
  // Only allow relative URLs or same origin
  return url.startsWith('/') && !url.startsWith('//');
}

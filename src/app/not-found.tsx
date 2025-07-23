import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import GoBackButton from '@/components/ui/go-back-button';

export const metadata: Metadata = {
  title: 'Chrono Click - Page Not Found',
  description: 'The page you are looking for does not exist.',
};

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* 404 Number */}
          <div className="mb-6">
            <h1 className="text-8xl font-bold text-primary mb-4">404</h1>
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mb-4">
              <Search className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          {/* Error Message */}
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>

          <p className="text-gray-600 mb-6">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Home className="h-4 w-4" />
              Go Home
            </Link>

            <GoBackButton />
          </div>

          {/* Popular Links */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">Popular pages:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              <Link
                href="/shop"
                className="text-sm text-primary hover:underline"
              >
                Shop
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/dashboard"
                className="text-sm text-primary hover:underline"
              >
                Dashboard
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                href="/orders"
                className="text-sm text-primary hover:underline"
              >
                Orders
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

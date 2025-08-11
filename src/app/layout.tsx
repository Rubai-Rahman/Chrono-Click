import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/main/header/navbar';
import Footer from '@/components/main/footer/footer';
import BackToTop from '@/components/ui/back-to-top';
import MobileBottomNav from '@/components/main/header/mobile-bottom-nav';
import Providers from './providers';
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'Chrono Click - Premium Timepieces & Luxury Watches',
    template: '%s | Chrono Click',
  },
  description:
    'Discover premium timepieces and luxury watches at Chrono Click. Your ultimate destination for stylish watches, accessories, and exceptional craftsmanship. Shop authentic brands with worldwide shipping.',
  keywords: [
    'luxury watches',
    'premium timepieces',
    'watch store',
    'authentic watches',
    'chronograph',
    'mechanical watches',
    'digital watches',
    'watch accessories',
    'timepiece collection',
    'watch brands',
    'online watch store',
    'watch shopping',
  ],
  authors: [{ name: 'Chrono Click Team' }],
  creator: 'Chrono Click',
  publisher: 'Chrono Click',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://chronoclick.com'), // Replace with your actual domain
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://chronoclick.com', // Replace with your actual domain
    siteName: 'Chrono Click',
    title: 'Chrono Click - Premium Timepieces & Luxury Watches',
    description:
      'Discover premium timepieces and luxury watches at Chrono Click. Your ultimate destination for stylish watches, accessories, and exceptional craftsmanship.',
    images: [
      {
        url: '/og-image.jpg', // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: 'Chrono Click - Premium Timepieces Collection',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@chronoclick', // Replace with your Twitter handle
    creator: '@chronoclick',
    title: 'Chrono Click - Premium Timepieces & Luxury Watches',
    description:
      'Discover premium timepieces and luxury watches at Chrono Click. Your ultimate destination for stylish watches and accessories.',
    images: ['/twitter-image.jpg'], // Add your Twitter card image
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Add your Google Search Console verification
    // yandex: 'your-yandex-verification-code',
    // yahoo: 'your-yahoo-verification-code',
  },
  category: 'e-commerce',
  classification: 'Business',
  referrer: 'origin-when-cross-origin',

  manifest: '/manifest.json', // Add if you have a PWA manifest
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Chrono Click',
  },
  applicationName: 'Chrono Click',
  generator: 'Next.js',
  abstract: 'Premium timepieces and luxury watches e-commerce platform',
  archives: ['https://chronoclick.com/sitemap.xml'], // Replace with your sitemap URL
  bookmarks: ['https://chronoclick.com'], // Replace with your domain
  other: {
    'msapplication-TileColor': '#000000',
    'msapplication-config': '/browserconfig.xml',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  colorScheme: 'dark light',
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: 'oklch(0.9965 0.017 106.7)',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: 'oklch(0.2621 0.0095 248.19)',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} w-full antialiased overflow-x-hidden `}
      >
        <Providers>
          <NextTopLoader
            color="oklch(0.6033 0.0948 83.89)"
            showSpinner={false}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}

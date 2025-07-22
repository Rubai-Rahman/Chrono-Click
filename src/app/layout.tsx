import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/main/header/navbar';
import Footer from '@/components/main/footer/footer';
import BackToTop from '@/components/ui/back-to-top';
import ScrollRestoration from '@/components/ui/scroll-restoration';
import Providers from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Chrono Click',
  description: 'A Next.js e-commerce application',
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
          <ScrollRestoration />
          <Navbar />
          {children}
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}

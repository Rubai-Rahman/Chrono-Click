import Navbar from '@/components/main/header/navbar';
import Footer from '@/components/main/footer/footer';
import BackToTop from '@/components/ui/back-to-top';
import MobileBottomNav from '@/components/main/header/mobile-bottom-nav';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <BackToTop />
      <MobileBottomNav />
    </>
  );
}

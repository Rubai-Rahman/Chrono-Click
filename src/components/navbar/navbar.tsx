import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/favicon.png';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Suspense, lazy } from 'react';
import Cart from '../cart/cart';
import { navItems } from '@/lib/constant';

const ProfileMenu = lazy(() => import('../profile/profile-menu'));

const Navbar = () => {
  const auth = true;

  return (
    <nav className="bg-foreground text-primary-foreground">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link href="/home" className="flex items-center gap-2">
          <Image src={logo} alt="Logo" width={30} height={30} />
          <span className="text-primary font-bold text-lg">CHRONO CLICK</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-primary transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-4">
          <Cart />
          {auth ? (
            <Suspense fallback={<span>Profile</span>}>
              <ProfileMenu />
            </Suspense>
          ) : (
            <Link href="/login">LogIn</Link>
          )}
        </div>

        {/* Mobile menu (hamburger) */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-primary-foreground hover:text-primary">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px]">
              <div className="flex flex-col gap-4 mt-6">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium hover:text-primary"
                  >
                    {item.name}
                  </Link>
                ))}
                <Cart />
                {auth ? (
                  <Suspense fallback={<span>profile</span>}>
                    <ProfileMenu />
                  </Suspense>
                ) : (
                  <Link href="/login" className="text-sm font-medium">
                    LogIn
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

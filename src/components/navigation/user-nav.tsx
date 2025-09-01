'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import {
  CircleUserRound,
  User,
  Settings,
  LogOut,
  Moon,
  Sun,
  ShoppingBag,
  Heart,
  CreditCard,
  MapPin,
  Shield,
  Package,
  Users,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useHydration } from '@/hooks/useHydration';
import { logoutAction } from '@/app/actions/authAction';
import Link from 'next/link';

export function UserNav() {
  const { theme, setTheme } = useTheme();
  const isHydrated = useHydration();
  const { user } = useAuth();
  const router = useRouter();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'orders':
        router.push('/orders');
        break;
      case 'wishlist':
        router.push('/wishlist');
        break;
      case 'addresses':
        router.push('/addresses');
        break;
      case 'payment':
        router.push('/payment-methods');
        break;
      case 'settings':
        router.push('/settings');
        break;
      case 'admin':
        router.push('/admin');
        break;
      case 'admin-products':
        router.push('/admin/products');
        break;
      case 'admin-orders':
        router.push('/admin/orders');
        break;
      case 'admin-customers':
        router.push('/admin/customers');
        break;
      case 'logout':
        logoutAction();
        break;
      default:
        break;
    }
  };

  if (!isHydrated) {
    return <CircleUserRound className="size-6 text-muted-foreground" />;
  }

  if (!user) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" asChild>
          <Link href="/login">Log In</Link>
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative h-10 w-10 rounded-full"
        >
          {user?.photoURL ? (
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={user?.photoURL || '/placeholder.svg'}
                alt={user?.name || 'User'}
              />
              <AvatarFallback>
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </AvatarFallback>
            </Avatar>
          ) : (
            <CircleUserRound className="size-6 hover:text-primary transition-colors" />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 mt-2" align="end" forceMount>
        {/* User Info Section */}
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name || 'User'}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* Role-based Menu Items */}
        <DropdownMenuGroup>
          {user?.role === 'admin' ? (
            // Admin Menu Items
            <>
              <DropdownMenuItem
                onClick={() => handleMenuAction('admin')}
                className="cursor-pointer"
              >
                <Shield className="mr-2 size-4" />
                <span>Admin Dashboard</span>
                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push('/admin/products')}
                className="cursor-pointer"
              >
                <Package className="mr-2 size-4" />
                <span>Manage Products</span>
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push('/admin/orders')}
                className="cursor-pointer"
              >
                <ShoppingBag className="mr-2 size-4" />
                <span>Manage Orders</span>
                <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => router.push('/admin/customers')}
                className="cursor-pointer"
              >
                <Users className="mr-2 size-4" />
                <span>Manage Customers</span>
                <DropdownMenuShortcut>⌘U</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() => handleMenuAction('orders')}
                className="cursor-pointer"
              >
                <User className="mr-2 size-4" />
                <span>Personal Account</span>
                <DropdownMenuShortcut>⇧⌘A</DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          ) : (
            // Regular User Menu Items
            <>
              <DropdownMenuItem
                onClick={() => handleMenuAction('orders')}
                className="cursor-pointer"
              >
                <ShoppingBag className="mr-2 size-4" />
                <span>My Orders</span>
                <DropdownMenuShortcut>⌘O</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleMenuAction('wishlist')}
                className="cursor-pointer"
              >
                <Heart className="mr-2 size-4" />
                <span>Wishlist</span>
                <DropdownMenuShortcut>⌘W</DropdownMenuShortcut>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleMenuAction('addresses')}
                className="cursor-pointer"
              >
                <MapPin className="mr-2 size-4" />
                <span>Addresses</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => handleMenuAction('payment')}
                className="cursor-pointer"
              >
                <CreditCard className="mr-2 size-4" />
                <span>Payment Methods</span>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Theme Toggle */}
        <DropdownMenuItem className="cursor-pointer" onClick={toggleTheme}>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center">
              {theme === 'dark' ? (
                <Sun className="mr-2 size-4" />
              ) : (
                <Moon className="mr-2 size-4" />
              )}
              <span>Dark Mode</span>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={toggleTheme}
              className="ml-2"
            />
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => handleMenuAction('settings')}
          className="cursor-pointer"
        >
          <Settings className="mr-2 size-4" />
          <span>Settings</span>
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          onClick={() => handleMenuAction('logout')}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 size-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

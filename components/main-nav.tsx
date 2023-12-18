'use client';

import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { cn } from '@/lib/utils';
import AdminMenu from '@/components/admin-menu';
import ShopMenu from '@/components/shop-menu';
import NavbarActions from './navbar-actions';

export default function MainNav() {
  const pathName = usePathname();
  const paramsValue = useParams();
  const params = paramsValue.param;
  const { user } = useUser();

  const routes = [
    {
      href: '/Contact',
      label: 'Contact',
      active: pathName === `/contact`,
    },
    // {
    //   href: '/Cart',
    //   label: 'Cart',
    //   active: pathName === `/cart`,
    // },
    // {
    //   href: '/Order',
    //   label: 'Order',
    //   active: pathName === `/order`,
    // },
  ];

  // const canAccessAdmin = Boolean(
  //   user &&
  //     typeof user.publicMetadata === 'object' &&
  //     Array.isArray(user.publicMetadata.accessible_paths) &&
  //     user.publicMetadata.accessible_paths.includes('/admin')
  // );
  console.log('$$$$$ app > main-nav.tsx');
  const accessiblePaths = user?.publicMetadata?.accessible_paths;
  console.log('+++++accessiblePaths', accessiblePaths);

  const canAccessAdmin =
    Array.isArray(accessiblePaths) && accessiblePaths.includes('/admin');

  return (
    <nav className='flex items-center space-x-4 lg:space-x-6'>
      <ShopMenu />
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            route.active
              ? 'text-black dark:text-white'
              : 'text-muted-foreground'
          )}
        >
          {route.label}
        </Link>
      ))}
      <NavbarActions />
      <AdminMenu canAccessAdmin={canAccessAdmin} />
    </nav>
  );
}
